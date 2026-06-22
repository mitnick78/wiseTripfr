"use client";

import { TripExpense } from "@/types/budget.types";
import { deleteExpenseAction } from "@/actions/budget/delete-expense.action";
import { CATEGORIES } from "@/lib/utils/budget";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  expense: TripExpense;
  tripId: string;
}

export default function ExpenseRow({ expense, tripId }: Props) {
  const router = useRouter();
  const cat = CATEGORIES[expense.category];

  const handleDelete = async () => {
    if (!confirm("Supprimer cette dépense ?")) return;
    await deleteExpenseAction(expense.id, tripId);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-3 py-3 border-b border-stone-100 last:border-0 group">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
        style={{ background: cat.bg }}
      >
        {cat.icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-stone-900 truncate">
          {expense.label}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs" style={{ color: cat.barColor }}>
            {cat.label}
          </span>
          {expense.paid_by && (
            <>
              <span className="text-stone-200">·</span>
              <span className="text-xs text-stone-400">{expense.paid_by}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-sm font-semibold text-stone-900">
          {Number(expense.amount).toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          {expense.currency}
        </span>
        <button
          onClick={handleDelete}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-300 hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}
