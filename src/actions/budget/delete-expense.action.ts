"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteExpenseAction(expenseId: string, tripId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("trip_expenses")
    .delete()
    .eq("id", expenseId);

  if (error) return { error: "Erreur lors de la suppression" };

  revalidatePath(`/trips/${tripId}`);
  return { error: "" };
}
