import { TripExpense, ExpenseCategory } from "@/types/budget.types";
import { CATEGORIES } from "@/lib/utils/budget";
import { Wallet, TrendingUp } from "lucide-react";

interface Props {
  expenses: TripExpense[];
  budget: number;
}

export default function BudgetSummary({ expenses, budget }: Props) {
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const remaining = budget - total;
  const percent = budget > 0 ? Math.min((total / budget) * 100, 100) : 0;
  const isOver = total > budget && budget > 0;

  const byCategory = Object.keys(CATEGORIES)
    .map((cat) => {
      const catTotal = expenses
        .filter((e) => e.category === cat)
        .reduce((sum, e) => sum + Number(e.amount), 0);
      return { category: cat as ExpenseCategory, total: catTotal };
    })
    .filter((c) => c.total > 0);

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-5">
      {/* Chiffres clés */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-stone-50 rounded-xl p-3 text-center">
          <p className="text-xs text-stone-400 mb-1">Budget prévu</p>
          <p className="text-lg font-semibold text-stone-900">
            {budget > 0 ? `${Number(budget).toLocaleString("fr-FR")} €` : "—"}
          </p>
        </div>
        <div className="bg-stone-50 rounded-xl p-3 text-center">
          <p className="text-xs text-stone-400 mb-1">Dépensé</p>
          <p
            className={`text-lg font-semibold ${isOver ? "text-red-500" : "text-stone-900"}`}
          >
            {total.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            €
          </p>
        </div>
        <div className="bg-stone-50 rounded-xl p-3 text-center">
          <p className="text-xs text-stone-400 mb-1">Restant</p>
          <p
            className={`text-lg font-semibold ${
              budget === 0
                ? "text-stone-400"
                : remaining < 0
                  ? "text-red-500"
                  : "text-[#2D6A4F]"
            }`}
          >
            {budget > 0
              ? `${remaining.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
              : "—"}
          </p>
        </div>
      </div>

      {/* Barre de progression */}
      {budget > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-stone-400">
              {percent.toFixed(0)}% du budget utilisé
            </span>
            {isOver && (
              <span className="text-xs text-red-500 font-medium flex items-center gap-1">
                <TrendingUp size={11} />
                Dépassement de{" "}
                {Math.abs(remaining).toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                })}{" "}
                €
              </span>
            )}
          </div>
          <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isOver
                  ? "bg-red-400"
                  : percent > 80
                    ? "bg-amber-400"
                    : "bg-[#2D6A4F]"
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      )}

      {/* Par catégorie */}
      {byCategory.length > 0 && (
        <div>
          <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-3">
            Par catégorie
          </p>
          <div className="space-y-2.5">
            {byCategory.map(({ category, total: catTotal }) => {
              const cat = CATEGORIES[category];
              const catPercent = total > 0 ? (catTotal / total) * 100 : 0;

              return (
                <div key={category} className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
                    style={{ background: cat.bg }}
                  >
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-stone-600">
                        {cat.label}
                      </span>
                      <span className="text-xs font-medium text-stone-900">
                        {catTotal.toLocaleString("fr-FR", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        €
                      </span>
                    </div>
                    <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${catPercent}%`,
                          background: cat.barColor,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {expenses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-3">
            <Wallet size={18} className="text-[#BC4800]" />
          </div>
          <p className="text-sm text-stone-400">Aucune dépense enregistrée</p>
        </div>
      )}
    </div>
  );
}
