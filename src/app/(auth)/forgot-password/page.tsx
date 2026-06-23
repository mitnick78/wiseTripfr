"use client";

import { forgotPasswordAction } from "@/actions/auth/forgot-password.action";
import { useActionState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { inputClass } from "@/lib/utils/styles";
import Image from "next/image";

const initialState = { error: "", success: false };

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(
    forgotPasswordAction,
    initialState,
  );

  return (
    <div
      className="min-h-screen bg-[#FAF8F5] flex flex-col"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <nav className="px-6 py-4">
        <Link href="/" aria-label="WiseTrip — Retour à l'accueil">
          <Image
            src="/images/logo/logo_red.png"
            alt="WiseTrip"
            width={80}
            height={36}
            style={{ width: "auto", height: "auto" }}
            className="object-contain"
            priority
          />
        </Link>
      </nav>

      <main
        id="main-content"
        className="flex-1 flex items-center justify-center px-6 py-12"
      >
        <div className="w-full max-w-sm">
          {state.success ? (
            // ✅ État succès
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={28} className="text-[#2D6A4F]" />
              </div>
              <h1 className="text-2xl font-semibold text-stone-900 tracking-tight mb-3">
                Email envoyé !
              </h1>
              <p className="text-sm text-stone-400 leading-relaxed mb-6">
                Si un compte existe avec cette adresse, vous recevrez un lien
                pour réinitialiser votre mot de passe dans quelques minutes.
              </p>
              <p className="text-xs text-stone-400 mb-6">
                Vérifiez également vos spams.
              </p>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#BC4800] text-white rounded-xl text-sm font-medium hover:bg-[#963900] transition-colors no-underline"
              >
                Retour à la connexion
              </Link>
            </div>
          ) : (
            // 📧 Formulaire email
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-stone-900 tracking-tight mb-2">
                  Mot de passe oublié ?
                </h1>
                <p className="text-sm text-stone-400 leading-relaxed">
                  Entrez votre email et nous vous enverrons un lien pour
                  réinitialiser votre mot de passe.
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <form action={formAction} className="space-y-4" noValidate>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-stone-700 mb-1.5"
                    >
                      Adresse email
                    </label>
                    <div className="relative">
                      <div
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                        aria-hidden="true"
                      >
                        <Mail size={15} />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="vous@exemple.com"
                        className={`${inputClass} pl-10`}
                        aria-required="true"
                      />
                    </div>
                  </div>

                  {state?.error && (
                    <div
                      role="alert"
                      aria-live="polite"
                      className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl"
                    >
                      <span aria-hidden="true"></span>
                      {state.error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isPending}
                    aria-busy={isPending}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#BC4800] text-white rounded-xl text-sm font-medium hover:bg-[#963900] disabled:opacity-50 transition-colors"
                  >
                    {isPending ? (
                      <>
                        <span
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                          aria-hidden="true"
                        />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le lien
                        <ArrowRight size={14} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              <p className="mt-5 text-center text-sm text-stone-400">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-1.5 text-stone-500 hover:text-stone-700 transition-colors"
                >
                  <ArrowLeft size={14} />
                  Retour à la connexion
                </Link>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
