"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ActionState = { error: string };

const AddActivitySchema = z.object({
  step_id: z.string().uuid(),
  trip_id: z.string().uuid(),
  title: z.string().min(1, "Titre requis").max(100),
  notes: z.string().max(500).optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  order_index: z.coerce.number().min(0).default(0),
});

export async function addActivityAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = AddActivitySchema.safeParse({
    step_id: formData.get("step_id"),
    trip_id: formData.get("trip_id"),
    title: formData.get("title"),
    notes: formData.get("notes") || undefined,
    lat: formData.get("lat") || undefined,
    lng: formData.get("lng") || undefined,
    order_index: formData.get("order_index") || 0,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Non authentifié" };

  const { error } = await supabase.from("trip_activities").insert(parsed.data);

  if (error) return { error: "Erreur lors de l'ajout de l'activité" };

  revalidatePath(`/trips/${parsed.data.trip_id}`);
  return { error: "" };
}
