import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function ConfirmPage() {
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

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail size={28} className="text-[#BC4800]" />
          </div>

          <h1 className="text-2xl font-semibold text-stone-900 tracking-tight mb-3">
            Vérifiez vos emails
          </h1>

          <p className="text-sm text-stone-400 leading-relaxed mb-6">
            Un lien de confirmation vous a été envoyé. Cliquez dessus pour
            activer votre compte WiseTrip.
          </p>

          <div className="bg-white border border-stone-200 rounded-2xl p-5 text-left space-y-3 mb-6">
            {[
              "Ouvrez votre boîte email",
              "Cherchez un email de WiseTrip",
              "Cliquez sur le lien de confirmation",
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-[#BC4800]">
                    {i + 1}
                  </span>
                </div>
                <p className="text-sm text-stone-600">{step}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-stone-400 mb-4">
            Vous n'avez pas reçu l&apos;email ? Vérifiez vos spams.
          </p>

          <Link
            href="/login"
            className="text-sm text-[#BC4800] font-medium hover:underline"
          >
            Retour à la connexion
          </Link>
        </div>
      </main>
    </div>
  );
}
