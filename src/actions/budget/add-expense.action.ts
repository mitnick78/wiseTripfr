"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ActionState = { error: string };

const AddExpenseSchema = z.object({
  trip_id: z.string().uuid(),
  category: z.enum([
    "transport",
    "accommodation",
    "food",
    "activity",
    "shopping",
    "other",
  ]),
  label: z.string().min(1, "Libellé requis").max(100),
  amount: z.coerce.number().positive("Montant invalide"),
  currency: z.string().default("EUR"),
  paid_by: z.string().max(50).optional(),
});

export async function addExpenseAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = AddExpenseSchema.safeParse({
    trip_id: formData.get("trip_id"),
    category: formData.get("category"),
    label: formData.get("label"),
    amount: formData.get("amount"),
    currency: formData.get("currency") || "EUR",
    paid_by: formData.get("paid_by") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Non authentifié" };

  const { error } = await supabase.from("trip_expenses").insert(parsed.data);

  if (error) return { error: "Erreur lors de l'ajout de la dépense" };

  revalidatePath(`/trips/${parsed.data.trip_id}`);
  return { error: "" };
}
