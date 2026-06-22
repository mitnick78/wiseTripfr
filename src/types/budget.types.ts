export type ExpenseCategory =
  | "transport"
  | "accommodation"
  | "food"
  | "activity"
  | "shopping"
  | "other";

export interface TripExpense {
  id: string;
  trip_id: string;
  step_id?: string;
  category: ExpenseCategory;
  label: string;
  amount: number;
  currency: string;
  paid_by?: string;
  created_at: string;
}

export type CreateExpensePayload = Omit<TripExpense, "id" | "created_at">;
