"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

type ActionState = { error: string };

const CreateTripSchema = z
  .object({
    title: z.string().min(2, "Minimum 2 caractères").max(100),
    destination: z.string().min(2, "Destination requise").max(100),
    start_date: z.string().min(1, "Date de début requise"),
    end_date: z.string().min(1, "Date de fin requise"),
    budget: z.coerce.number().min(0).default(0),
  })
  .refine((data) => new Date(data.end_date) >= new Date(data.start_date), {
    message: "La date de fin doit être après la date de début",
    path: ["end_date"],
  });

export async function createTripAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = CreateTripSchema.safeParse({
    title: formData.get("title"),
    destination: formData.get("destination"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date"),
    budget: formData.get("budget"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Non authentifié" };

  const { error } = await supabase.from("trips").insert({
    user_id: user.id,
    ...parsed.data,
    status: "draft",
    is_shared: false,
  });

  if (error) return { error: "Erreur lors de la création du voyage" };

  redirect("/dashboard");
}
