import { ExpenseCategory } from "@/types/budget.types";

export const CATEGORIES: Record<
  ExpenseCategory,
  { label: string; icon: string; color: string; bg: string; barColor: string }
> = {
  transport: {
    label: "Transport",
    icon: "✈️",
    color: "text-[#BC4800]",
    bg: "#FFF0E8",
    barColor: "#BC4800",
  },
  accommodation: {
    label: "Hébergement",
    icon: "🏨",
    color: "text-[#185FA5]",
    bg: "#E6F1FB",
    barColor: "#185FA5",
  },
  food: {
    label: "Restauration",
    icon: "🍽️",
    color: "text-[#2D6A4F]",
    bg: "#EAF7EF",
    barColor: "#2D6A4F",
  },
  activity: {
    label: "Activités",
    icon: "🎯",
    color: "text-[#854F0B]",
    bg: "#FAEEDA",
    barColor: "#854F0B",
  },
  shopping: {
    label: "Shopping",
    icon: "🛍️",
    color: "text-[#6D3A9C]",
    bg: "#F3EBF9",
    barColor: "#6D3A9C",
  },
  other: {
    label: "Autre",
    icon: "📦",
    color: "text-stone-500",
    bg: "#F7F5F0",
    barColor: "#888780",
  },
};
