import { MapPin, Calendar, Footprints, Wallet } from "lucide-react";
import { Trip } from "@/types/trip.types";

interface Props {
  trips: Trip[];
}

export default function DashboardStats({ trips }: Props) {
  const ongoing = trips.filter((t) => t.status === "ongoing").length;
  const planned = trips.filter((t) => t.status === "planned").length;
  const totalBudget = trips.reduce((sum, t) => sum + Number(t.budget ?? 0), 0);
  const upcoming = trips.filter((t) => {
    const start = new Date(t.start_date);
    const now = new Date();
    return start > now;
  }).length;

  const stats = [
    {
      icon: <MapPin size={16} />,
      label: "Voyages",
      value: trips.length,
      sub: `${ongoing} en cours`,
      color: "text-[#BC4800]",
      bg: "bg-orange-50",
    },
    {
      icon: <Calendar size={16} />,
      label: "À venir",
      value: upcoming,
      sub: `${planned} planifiés`,
      color: "text-[#185FA5]",
      bg: "bg-blue-50",
    },
    {
      icon: <Footprints size={16} />,
      label: "Destinations",
      value: new Set(trips.map((t) => t.destination)).size,
      sub: "pays visités",
      color: "text-[#2D6A4F]",
      bg: "bg-emerald-50",
    },
    {
      icon: <Wallet size={16} />,
      label: "Budget total",
      value: totalBudget > 0 ? `${totalBudget.toLocaleString("fr-FR")} €` : "—",
      sub: "tous voyages",
      color: "text-[#854F0B]",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-stone-200 rounded-xl p-4"
        >
          <div
            className={`w-8 h-8 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-3`}
          >
            {stat.icon}
          </div>
          <div className="text-xl font-semibold text-stone-900 mb-0.5">
            {stat.value}
          </div>
          <div className="text-xs text-stone-400">{stat.sub}</div>
          <div className="text-xs font-medium text-stone-600 mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
