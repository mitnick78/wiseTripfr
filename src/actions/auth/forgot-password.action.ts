"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

type ActionState = { error: string; success: boolean };

const Schema = z.object({
  email: z.email("Email invalide"),
});

export async function forgotPasswordAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = Schema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message, success: false };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/auth/reset`,
    },
  );

  // On retourne toujours success pour ne pas révéler
  // si l'email existe ou non — sécurité importante
  if (error) console.error(error);

  return { error: "", success: true };
}
