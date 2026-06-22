"use client";

import { addExpenseAction } from "@/actions/budget/add-expense.action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/utils/budget";
import { inputClass, labelClass } from "@/lib/utils/styles";

type ActionState = { error: string };
const initialState: ActionState = { error: "" };

interface Props {
  tripId: string;
  onClose: () => void;
}

export default function AddExpenseForm({ tripId, onClose }: Props) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    addExpenseAction,
    initialState,
  );

  useEffect(() => {
    if (!isPending && !state.error && state !== initialState) {
      router.refresh();
      onClose();
    }
  }, [isPending, state]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="trip_id" value={tripId} />

      <div>
        <label className={labelClass}>Catégorie</label>
        <select name="category" required className={inputClass}>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <option key={key} value={key}>
              {cat.icon} {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>
          Libellé <span className="text-red-400">*</span>
        </label>
        <input
          name="label"
          type="text"
          required
          placeholder="Ex: Billet d'avion Paris → Tokyo"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>
            Montant <span className="text-red-400">*</span>
          </label>
          <input
            name="amount"
            type="number"
            required
            min="0"
            step="0.01"
            placeholder="0.00"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Devise</label>
          <select name="currency" className={inputClass}>
            <option value="EUR">EUR €</option>
            <option value="USD">USD $</option>
            <option value="GBP">GBP £</option>
            <option value="JPY">JPY ¥</option>
            <option value="CHF">CHF ₣</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Payé par</label>
        <input
          name="paid_by"
          type="text"
          placeholder="Ex: Christophe"
          className={inputClass}
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-2.5 rounded-xl">
          {state.error}
        </p>
      )}

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2.5 border border-stone-200 text-stone-600 rounded-xl text-sm hover:bg-stone-50 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 py-2.5 bg-[#BC4800] text-white rounded-xl text-sm font-medium hover:bg-[#963900] disabled:opacity-50 transition-colors"
        >
          {isPending ? "Ajout..." : "Ajouter"}
        </button>
      </div>
    </form>
  );
}
