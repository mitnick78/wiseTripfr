"use client";

import { registerAction } from "@/actions/auth/register.action";
import { useActionState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { inputClass } from "@/lib/utils/styles";
import Image from "next/image";
import Logo from "@/components/ui/logo";

const initialState = { error: "" };

const PERKS = [
  "Planification d'itinéraire sur carte",
  "Suivi de budget en temps réel",
  "Accès gratuit, sans carte bancaire",
];

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1200&q=80"
          alt="Vue aérienne d'une destination de voyage tropicale"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-stone-900/50" aria-hidden="true" />

        <div className="absolute top-10 left-10 z-20">
          <Link
            href="/"
            aria-label="WiseTrip — Retour à l'accueil"
            className="cursor-pointer"
          >
            <Logo width={100} inverted priority />
          </Link>
        </div>

        {/* Contenu centré */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-12 text-center">
          <h2
            className="text-white text-3xl font-semibold leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            Votre prochain voyage commence ici
          </h2>
          <ul className="space-y-4 w-full max-w-xs" role="list">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <CheckCircle size={12} className="text-white" />
                </div>
                <span className="text-sm text-white/80 text-left">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-6 left-10 z-10">
          <p className="text-xs text-white/30">
            Photo par{" "}
            <a
              href="https://unsplash.com/@anniespratt"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/60 transition-colors"
            >
              Annie Spratt
            </a>{" "}
            sur{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/60 transition-colors"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>

      {/* Colonne droite — form */}
      <div className="flex-1 flex flex-col bg-[#FAF8F5]">
        {/* Nav mobile */}
        <nav className="px-6 py-4 lg:hidden" aria-label="Navigation">
          <Link href="/" aria-label="WiseTrip — Retour à l'accueil">
            <Image
              src="/images/logo/logo_red.png"
              alt="WiseTrip"
              width={80}
              height={36}
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
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-stone-900 tracking-tight mb-1">
                Créer un compte
              </h1>
              <p className="text-sm text-stone-400">
                Gratuit · Aucune carte bancaire requise
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
                      aria-describedby={state.error ? "form-error" : undefined}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-stone-700 mb-1.5"
                  >
                    Mot de passe
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
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="Minimum 6 caractères"
                      className={`${inputClass} pl-10`}
                      aria-required="true"
                      aria-describedby="password-hint"
                    />
                  </div>
                  <p id="password-hint" className="mt-1 text-xs text-stone-400">
                    Au moins 6 caractères
                  </p>
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
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="••••••••"
                      className={`${inputClass} pl-10`}
                      aria-required="true"
                    />
                  </div>
                </div>

                {state?.error && (
                  <div
                    id="form-error"
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
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#BC4800] text-white rounded-xl text-sm font-medium hover:bg-[#963900] disabled:opacity-50 transition-colors mt-2"
                >
                  {isPending ? (
                    <>
                      <span
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        aria-hidden="true"
                      />
                      Création du compte...
                    </>
                  ) : (
                    <>
                      Créer mon compte
                      <ArrowRight size={14} aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className="text-xs text-stone-400 text-center">
                  En créant un compte, vous acceptez nos conditions
                  d&apos;utilisation.
                </p>
              </form>
            </div>

            <p className="mt-5 text-center text-sm text-stone-400">
              Déjà un compte ?{" "}
              <Link
                href="/login"
                className="text-[#BC4800] font-medium hover:underline"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
