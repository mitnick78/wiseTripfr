"use server";

import { createClient } from "@/lib/supabase/server";

import { redirect } from "next/navigation";

export async function deleteTripAction(tripId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Non authentifié" };
  const { error } = await supabase
    .from("trips")
    .delete()
    .eq("id", tripId)
    .eq("user_id", user.id);
  console.log("Delete trip error:", error);
  if (error) return { error: "Erreur lors de la suppression du voyage" };

  redirect("/dashboard");
}
