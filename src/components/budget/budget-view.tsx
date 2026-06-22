"use client";

import { useState } from "react";
import { TripExpense } from "@/types/budget.types";
import BudgetSummary from "./budget-summary";
import ExpenseRow from "./expense-row";
import AddExpenseForm from "./add-expense-form";
import Modal from "@/components/ui/modal";
import { Plus, Receipt } from "lucide-react";

interface Props {
  tripId: string;
  expenses: TripExpense[];
  budget: number;
}

export default function BudgetView({ tripId, expenses, budget }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Summary */}
      <div className="lg:col-span-1">
        <BudgetSummary expenses={expenses} budget={budget} />
      </div>

      {/* Liste dépenses */}
      <div className="lg:col-span-2">
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Receipt size={15} className="text-stone-400" />
              <span className="text-sm font-semibold text-stone-900">
                Dépenses
              </span>
              <span className="text-xs text-stone-400">
                ({expenses.length})
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#BC4800] text-white text-xs font-medium rounded-lg hover:bg-[#963900] transition-colors"
            >
              <Plus size={13} />
              Ajouter
            </button>
          </div>

          <div className="px-5">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <ExpenseRow
                  key={expense.id}
                  expense={expense}
                  tripId={tripId}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-sm text-stone-400">
                  Aucune dépense enregistrée
                </p>
                <p className="text-xs text-stone-300 mt-1">
                  Clique sur + pour ajouter ta première dépense
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        title="Ajouter une dépense"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <AddExpenseForm tripId={tripId} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
