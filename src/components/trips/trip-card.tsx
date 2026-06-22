import { Trip } from "@/types/trip.types";
import { formatDate } from "@/lib/utils/format";
import { MapPin, Calendar, Wallet } from "lucide-react";
import Link from "next/link";

const STATUS_STYLES: Record<
  Trip["status"],
  { label: string; className: string }
> = {
  draft: { label: "Brouillon", className: "bg-stone-100 text-stone-500" },
  planned: { label: "Planifié", className: "bg-orange-50 text-[#BC4800]" },
  ongoing: { label: "En cours", className: "bg-emerald-50 text-[#2D6A4F]" },
  completed: { label: "Terminé", className: "bg-stone-100 text-stone-500" },
};

const DESTINATION_COLORS: Record<string, string> = {
  default: "from-[#BC4800] to-[#FF8542]",
  a: "from-[#185FA5] to-[#378ADD]",
  b: "from-[#2D6A4F] to-[#52A882]",
  c: "from-[#854F0B] to-[#BA7517]",
  d: "from-[#BC4800] to-[#FF8542]",
};

function getGradient(title: string) {
  const colors = Object.values(DESTINATION_COLORS);
  const index = title.charCodeAt(0) % colors.length;
  return colors[index];
}

export default function TripCard({ trip }: { trip: Trip }) {
  const status = STATUS_STYLES[trip.status];
  const gradient = getGradient(trip.title);

  return (
    <Link href={`/trips/${trip.id}`} className="no-underline group">
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-stone-300 transition-all duration-200">
        {/* Image / couleur header */}
        <div
          className={`h-28 bg-gradient-to-br ${gradient} relative flex items-end p-3`}
        >
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium z-10 ${status.className}`}
          >
            {status.label}
          </span>
        </div>

        {/* Body */}
        <div className="p-4">
          <h3 className="font-semibold text-stone-900 text-[15px] mb-3 group-hover:text-[#BC4800] transition-colors line-clamp-1">
            {trip.title}
          </h3>

          <div className="space-y-1.5 mb-4">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <MapPin size={12} className="shrink-0" />
              <span className="truncate">{trip.destination}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <Calendar size={12} className="shrink-0" />
              <span>
                {formatDate(trip.start_date)} → {formatDate(trip.end_date)}
              </span>
            </div>
            {trip.budget > 0 && (
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <Wallet size={12} className="shrink-0" />
                <span>{trip.budget.toLocaleString("fr-FR")} €</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
