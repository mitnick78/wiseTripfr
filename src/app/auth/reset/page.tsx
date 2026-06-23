"use client";

import { resetPasswordAction } from "@/actions/auth/reset-password.action";
import { useActionState, useState } from "react";
import Link from "next/link";
import { Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { inputClass } from "@/lib/utils/styles";
import PasswordStrength from "@/components/ui/password-strength";
import Image from "next/image";

const initialState = { error: "" };

export default function ResetPasswordPage() {
  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    initialState,
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-stone-900 tracking-tight mb-2">
              Nouveau mot de passe
            </h1>
            <p className="text-sm text-stone-400">
              Choisissez un mot de passe sécurisé pour votre compte.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <form action={formAction} className="space-y-4" noValidate>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <div
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                    aria-hidden="true"
                  >
                    <Lock size={15} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    placeholder="Minimum 8 caractères"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputClass} pl-10 pr-10`}
                    aria-required="true"
                    aria-describedby="password-strength"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                    aria-label={showPassword ? "Masquer" : "Afficher"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <div id="password-strength">
                  <PasswordStrength password={password} />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm"
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <div
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                    aria-hidden="true"
                  >
                    <Lock size={15} />
                  </div>
                  <input
                    id="confirm"
                    name="confirm"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    placeholder="••••••••"
                    className={`${inputClass} pl-10 pr-10`}
                    aria-required="true"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                    aria-label={showConfirm ? "Masquer" : "Afficher"}
                  >
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {state?.error && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl"
                >
                  <span aria-hidden="true">⚠️</span>
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
                    Mise à jour...
                  </>
                ) : (
                  <>
                    Mettre à jour le mot de passe
                    <ArrowRight size={14} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
