"use client";

import { useMemo } from "react";
import { Check, X } from "lucide-react";

interface Rule {
  label: string;
  test: (password: string) => boolean;
}

const RULES: Rule[] = [
  { label: "8 caractères minimum", test: (p) => p.length >= 8 },
  { label: "Une majuscule", test: (p) => /[A-Z]/.test(p) },
  { label: "Un chiffre", test: (p) => /[0-9]/.test(p) },
  { label: "Un caractère spécial", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

interface Props {
  password: string;
}

export default function PasswordStrength({ password }: Props) {
  const results = useMemo(
    () => RULES.map((rule) => ({ ...rule, valid: rule.test(password) })),
    [password],
  );

  const score = results.filter((r) => r.valid).length;

  const strength = useMemo(() => {
    if (password.length === 0) return null;
    if (score <= 1)
      return { label: "Très faible", color: "bg-red-400", width: "w-1/4" };
    if (score === 2)
      return { label: "Faible", color: "bg-orange-400", width: "w-2/4" };
    if (score === 3)
      return { label: "Moyen", color: "bg-amber-400", width: "w-3/4" };
    return { label: "Fort", color: "bg-[#2D6A4F]", width: "w-full" };
  }, [score, password]);

  if (password.length === 0) return null;

  return (
    <div className="mt-2 space-y-3">
      {/* Barre de force */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-stone-400">Force du mot de passe</span>
          {strength && (
            <span
              className={`text-xs font-medium ${
                score <= 1
                  ? "text-red-500"
                  : score === 2
                    ? "text-orange-500"
                    : score === 3
                      ? "text-amber-500"
                      : "text-[#2D6A4F]"
              }`}
            >
              {strength.label}
            </span>
          )}
        </div>
        <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${strength?.color} ${strength?.width}`}
          />
        </div>
      </div>

      {/* Checklist */}
      <ul className="space-y-1.5">
        {results.map((rule) => (
          <li key={rule.label} className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                rule.valid
                  ? "bg-[#2D6A4F] text-white"
                  : "bg-stone-100 text-stone-300"
              }`}
            >
              {rule.valid ? (
                <Check size={10} strokeWidth={3} />
              ) : (
                <X size={10} strokeWidth={3} />
              )}
            </div>
            <span
              className={`text-xs transition-colors ${
                rule.valid ? "text-[#2D6A4F] font-medium" : "text-stone-400"
              }`}
            >
              {rule.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
