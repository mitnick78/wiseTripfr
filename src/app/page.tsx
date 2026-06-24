import { Metadata } from "next";
import Link from "next/link";
import {
  Map,
  Wallet,
  ArrowRight,
  Star,
  Globe,
  Shield,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/components/ui/logo";

export const metadata: Metadata = {
  title: "WiseTrip — Planifiez vos voyages intelligemment",
  description:
    "Organisez vos voyages, planifiez vos itinéraires sur carte et gérez votre budget de voyage en un seul endroit. Gratuit pour commencer.",
};

const FEATURES = [
  {
    icon: <Map size={22} className="text-[#BC4800]" />,
    title: "Carte interactive",
    description:
      "Planifiez vos étapes directement sur la carte. Cliquez pour ajouter un point, visualisez votre itinéraire en temps réel.",
    bg: "bg-orange-50",
  },
  {
    icon: <Wallet size={22} className="text-[#185FA5]" />,
    title: "Suivi du budget",
    description:
      "Définissez un budget, suivez vos dépenses par catégorie et ne soyez plus jamais à court d'argent en voyage.",
    bg: "bg-blue-50",
  },
  {
    icon: <Globe size={22} className="text-[#2D6A4F]" />,
    title: "Multi-destinations",
    description:
      "Gérez plusieurs voyages simultanément. Organisez vos étapes par jour avec le drag & drop.",
    bg: "bg-emerald-50",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Créez votre voyage",
    desc: "Donnez un titre, une destination et des dates.",
  },
  {
    num: "02",
    title: "Planifiez l'itinéraire",
    desc: "Ajoutez vos étapes sur la carte interactive jour par jour.",
  },
  {
    num: "03",
    title: "Gérez votre budget",
    desc: "Suivez vos dépenses en temps réel par catégorie.",
  },
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-[#FAF8F5]"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <header role="banner">
        <nav
          className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200"
          aria-label="Navigation principale"
        >
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link
              href="/"
              aria-label="WiseTrip — Retour à l'accueil"
              className="cursor-pointer"
            >
              <Logo width={50} priority />
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900 transition-colors no-underline rounded-lg hover:bg-stone-100"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm bg-[#BC4800] text-white rounded-xl hover:bg-[#963900] transition-colors no-underline font-medium"
              >
                Commencer gratuitement
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main id="main-content">
        {/* ── Hero avec photo ── */}
        <section
          className="relative min-h-[90vh] flex items-center justify-center px-6 text-center overflow-hidden"
          aria-labelledby="hero-title"
        >
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
            aria-hidden="true"
          />

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-stone-900/60"
            aria-hidden="true"
          />

          {/* Contenu centré */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white/90 font-medium mb-6">
              <Star size={13} aria-hidden="true" />
              Planification de voyage simplifiée
            </div>

            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight mb-6"
            >
              Planifiez vos voyages{" "}
              <span
                className="text-orange-300"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                intelligemment
              </span>
            </h1>

            <p className="text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              WiseTrip vous aide à organiser vos itinéraires sur carte, gérer
              votre budget et planifier chaque étape de votre aventure.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/register"
                className="flex items-center gap-2 px-6 py-3 bg-[#BC4800] text-white rounded-xl text-sm font-medium hover:bg-[#963900] transition-colors no-underline w-full sm:w-auto justify-center"
                aria-label="Créer un compte gratuit sur WiseTrip"
              >
                Commencer gratuitement
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-colors no-underline w-full sm:w-auto justify-center"
              >
                J&apos;ai déjà un compte
              </Link>
            </div>

            <p className="mt-6 text-xs text-white/50">
              Gratuit pour commencer · Aucune carte bancaire requise
            </p>
          </div>

          {/* ✅ Crédit photo en bas à droite */}
          <div className="absolute bottom-6 right-6 z-10">
            <p className="text-xs text-white/30">
              Photo par{" "}
              <a
                href="https://unsplash.com/@bradenottwein"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/60 transition-colors"
              >
                Braden Ottwein
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
        </section>

        {/* ── Features ── */}
        <section
          className="py-20 px-6 bg-white border-y border-stone-200"
          aria-labelledby="features-title"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2
                id="features-title"
                className="text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight mb-3"
              >
                Tout ce dont vous avez besoin
              </h2>
              <p className="text-stone-400 max-w-md mx-auto">
                Des outils simples et efficaces pour organiser chaque aspect de
                votre voyage.
              </p>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              role="list"
            >
              {FEATURES.map((feature) => (
                <article
                  key={feature.title}
                  role="listitem"
                  className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-5 hover:border-stone-300 hover:shadow-sm transition-all"
                >
                  <div
                    className={`w-10 h-10 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}
                    aria-hidden="true"
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-stone-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-20 px-6" aria-labelledby="how-title">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2
                id="how-title"
                className="text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight mb-3"
              >
                Prêt en 3 étapes
              </h2>
              <p className="text-stone-400">
                Commencez à planifier votre prochain voyage en quelques minutes.
              </p>
            </div>

            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-8" role="list">
              {STEPS.map((step) => (
                <li
                  key={step.num}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center mb-4"
                    aria-hidden="true"
                  >
                    <span className="text-sm font-semibold text-[#BC4800]">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-stone-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-stone-400 leading-relaxed">
                    {step.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-20 px-6 bg-[#BC4800]"
          aria-labelledby="cta-title"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2
              id="cta-title"
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4"
            >
              Prêt pour votre prochaine aventure ?
            </h2>
            <p className="text-orange-100 mb-8 leading-relaxed">
              Rejoignez WiseTrip et commencez à planifier votre voyage dès
              aujourd&apos;hui. C&apos;est gratuit et sans engagement.
            </p>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#BC4800] rounded-xl text-sm font-semibold hover:bg-orange-50 transition-colors no-underline"
              aria-label="Créer un compte WiseTrip gratuitement"
            >
              Créer un compte gratuit
              <ArrowRight size={15} aria-hidden="true" />
            </Link>

            <ul
              className="mt-6 flex flex-wrap items-center justify-center gap-4"
              role="list"
            >
              {["Aucune carte bancaire", "Accès immédiat"].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 text-xs text-orange-100"
                >
                  <CheckCircle size={12} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        className="bg-white border-t border-stone-200 py-10 px-6"
        role="contentinfo"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" aria-label="WiseTrip — Retour à l'accueil">
            <Image
              src="/images/logo/logo_red.png"
              alt="WiseTrip"
              width={50}
              height={40}
              className="object-contain"
            />
          </Link>

          <nav aria-label="Liens du pied de page">
            <ul className="flex items-center gap-6" role="list">
              {[
                { href: "/login", label: "Connexion" },
                { href: "/register", label: "Inscription" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-stone-600 transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} WiseTrip. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
