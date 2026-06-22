"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deletePlaceAction(placeId: string, tripId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("trip_places")
    .delete()
    .eq("id", placeId);

  if (error) return { error: "Erreur lors de la suppression" };

  revalidatePath(`/trips/${tripId}`);
  return { error: "" };
}
