"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ActionState = { error: string };

const AddStepSchema = z.object({
  trip_id: z.string().uuid(),
  order_index: z.coerce.number().min(0),
  title: z.string().min(1, "Nom de la ville requis").max(100),
  location: z.string().max(100).optional(),
  arrival_date: z.string().optional(),
  departure_date: z.string().optional(),
  accommodation: z.string().max(200).optional(),
  notes: z.string().max(500).optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
});

export async function addStepAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = AddStepSchema.safeParse({
    trip_id: formData.get("trip_id"),
    order_index: formData.get("order_index"),
    title: formData.get("title"),
    location: formData.get("location") || undefined,
    arrival_date: formData.get("arrival_date") || undefined,
    departure_date: formData.get("departure_date") || undefined,
    accommodation: formData.get("accommodation") || undefined,
    notes: formData.get("notes") || undefined,
    lat: formData.get("lat") || undefined,
    lng: formData.get("lng") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Non authentifié" };

  const { error } = await supabase.from("trip_steps").insert({
    ...parsed.data,
    day_index: 0,
  });

  if (error) return { error: "Erreur lors de l'ajout de l'étape" };

  revalidatePath(`/trips/${parsed.data.trip_id}`);
  return { error: "" };
}
