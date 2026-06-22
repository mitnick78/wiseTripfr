"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ActionState = { error: string };

const AddPlaceSchema = z.object({
  step_id: z.string().uuid(),
  trip_id: z.string().uuid(),
  title: z.string().min(1, "Titre requis").max(100),
  notes: z.string().max(500).optional(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

export async function addPlaceAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = AddPlaceSchema.safeParse({
    step_id: formData.get("step_id"),
    trip_id: formData.get("trip_id"),
    title: formData.get("title"),
    notes: formData.get("notes") || undefined,
    lat: formData.get("lat"),
    lng: formData.get("lng"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Non authentifié" };

  const { error } = await supabase.from("trip_places").insert(parsed.data);

  if (error) return { error: "Erreur lors de l'ajout du lieu" };

  revalidatePath(`/trips/${parsed.data.trip_id}`);
  return { error: "" };
}
