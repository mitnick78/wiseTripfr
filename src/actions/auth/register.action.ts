"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

type ActionState = { error: string };

const RegisterSchema = z
  .object({
    email: z.email("Email invalide"),
    password: z
      .string()
      .min(8, "Minimum 8 caractères")
      .regex(/[A-Z]/, "Une majuscule requise")
      .regex(/[0-9]/, "Un chiffre requis")
      .regex(/[^A-Za-z0-9]/, "Un caractère spécial requis"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm"],
  });

export async function registerAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = RegisterSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) return { error: "Erreur lors de l'inscription" };
  redirect("/confirm");
}
