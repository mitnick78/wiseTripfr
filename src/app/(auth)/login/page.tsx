"use client";

import { loginAction } from "@/actions/auth/login.action";
import { useActionState, useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { inputClass } from "@/lib/utils/styles";
import Image from "next/image";

const initialState = { error: "" };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      {/* Colonne gauche — photo */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80"
          alt="Voyageur contemplant un paysage montagneux"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-stone-900/50" aria-hidden="true" />

        {/* Logo en haut à gauche */}
        <div className="absolute top-10 left-10 z-20">
          <Link href="/" aria-label="WiseTrip — Retour à l'accueil">
            <Image
              src="/images/logo/logo_red.png"
              alt="WiseTrip"
              width={100}
              height={45}
              style={{ width: "auto", height: "auto" }}
              className="object-contain brightness-0 invert"
            />
          </Link>
        </div>

        {/* Citation centrée */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-12 text-center">
          <blockquote
            className="text-white text-2xl font-semibold leading-relaxed"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            &ldquo;Le voyage est la seule chose qu&apos;on achète qui nous rend
            plus riche&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-white/50">— Anonyme</p>
        </div>

        {/* Crédit photo en bas à gauche */}
        <div className="absolute bottom-6 left-10 z-20">
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
                Bon retour !
              </h1>
              <p className="text-sm text-stone-400">
                Connectez-vous pour accéder à vos voyages
              </p>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <form action={formAction} className="space-y-4" noValidate>
                {/* Email */}
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

                {/* Mot de passe */}
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
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      placeholder="••••••••"
                      className={`${inputClass} pl-10 pr-10`}
                      aria-required="true"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                      aria-label={
                        showPassword
                          ? "Masquer le mot de passe"
                          : "Afficher le mot de passe"
                      }
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
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
                      Connexion...
                    </>
                  ) : (
                    <>
                      Se connecter
                      <ArrowRight size={14} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <p className="mt-5 text-center text-sm text-stone-400">
              Pas encore de compte ?{" "}
              <Link
                href="/register"
                className="text-[#BC4800] font-medium hover:underline"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
