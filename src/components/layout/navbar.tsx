import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "@/actions/auth/logout.action";
import Link from "next/link";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Logo from "../ui/logo";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-8">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center no-underline shrink-0"
          aria-label="WiseTrip — Retour au dashboard"
        >
          <Logo width={50} priority />
        </Link>
        {/* Links */}
        <div className="flex items-center gap-1 flex-1">
          <Link
            href="/dashboard"
            className="px-3 py-1.5 text-sm text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors no-underline"
          >
            Mes voyages
          </Link>
        </div>
        {/* User */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-[30px] h-[30px] bg-orange-50 border border-orange-100 rounded-full flex items-center justify-center text-xs font-semibold text-[#BC4800]">
            {user?.email?.[0].toUpperCase() ?? "?"}
          </div>

          <span className="text-sm text-stone-400 max-w-[160px] truncate hidden sm:block">
            {user?.email}
          </span>

          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-stone-500 border border-stone-200 rounded-md bg-transparent hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer font-sans"
              aria-label="Se déconnecter"
            >
              <LogOut size={14} aria-hidden="true" />
              <span className="hidden sm:block">Déconnexion</span>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
