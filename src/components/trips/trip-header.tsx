"use client";

import { useState } from "react";
import { Trip } from "@/types/trip.types";
import { deleteTripAction } from "@/actions/trips/delete-trip.action";
import {
  MapPin,
  Calendar,
  Wallet,
  Trash2,
  Pencil,
  ArrowLeft,
} from "lucide-react";
import { formatDate } from "@/lib/utils/format";
import Modal from "@/components/ui/modal";
import EditTripForm from "./edit-trip-form";
import Link from "next/link";

const STATUS_STYLES: Record<
  Trip["status"],
  { label: string; className: string }
> = {
  draft: { label: "Brouillon", className: "bg-stone-100 text-stone-500" },
  planned: {
    label: "Planifié",
    className: "bg-orange-50 text-[#BC4800] border border-orange-100",
  },
  ongoing: {
    label: "En cours",
    className: "bg-emerald-50 text-[#2D6A4F] border border-emerald-100",
  },
  completed: { label: "Terminé", className: "bg-stone-100 text-stone-500" },
};

export default function TripHeader({ trip }: { trip: Trip }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const status = STATUS_STYLES[trip.status];

  const handleDelete = async () => {
    if (!confirm("Supprimer ce voyage définitivement ?")) return;
    await deleteTripAction(trip.id);
  };

  return (
    <>
      <div className="mb-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-5">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-600 transition-colors no-underline"
          >
            <ArrowLeft size={14} />
            Mes voyages
          </Link>
          <span className="text-stone-300">/</span>
          <span className="text-sm text-stone-600 truncate max-w-xs">
            {trip.title}
          </span>
        </div>

        {/* Header card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Titre + statut */}
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h1 className="text-xl font-semibold text-stone-900 tracking-tight">
                  {trip.title}
                </h1>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.className}`}
                >
                  {status.label}
                </span>
              </div>

              {/* Metas */}
              <div className="flex items-center gap-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-sm text-stone-500">
                  <MapPin size={14} className="text-[#BC4800]" />
                  {trip.destination}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-stone-500">
                  <Calendar size={14} className="text-[#BC4800]" />
                  {formatDate(trip.start_date)} → {formatDate(trip.end_date)}
                </div>
                {trip.budget > 0 && (
                  <div className="flex items-center gap-1.5 text-sm text-stone-500">
                    <Wallet size={14} className="text-[#BC4800]" />
                    {Number(trip.budget).toLocaleString("fr-FR")} €
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsEditOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-stone-600 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
              >
                <Pencil size={14} />
                <span className="hidden sm:block">Éditer</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-500 border border-red-100 rounded-xl hover:bg-red-50 transition-colors"
              >
                <Trash2 size={14} />
                <span className="hidden sm:block">Supprimer</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Éditer le voyage"
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      >
        <EditTripForm trip={trip} onClose={() => setIsEditOpen(false)} />
      </Modal>
    </>
  );
}
