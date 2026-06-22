"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "@/components/ui/modal";
import CreateTripForm from "@/components/trips/create-trip-form";

interface Props {
  tripCount: number;
  userEmail?: string;
}

export default function DashboardHeader({ tripCount, userEmail }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const firstName = userEmail?.split("@")[0] ?? "là";

  return (
    <>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">
            Bonjour {firstName} 👋
          </h1>
          <p className="text-sm text-stone-400 mt-1">
            {tripCount === 0
              ? "Aucun voyage pour l'instant — créez le premier !"
              : `${tripCount} voyage${tripCount > 1 ? "s" : ""} planifié${tripCount > 1 ? "s" : ""}`}
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#BC4800] text-white text-sm font-medium rounded-xl hover:bg-[#963900] transition-colors"
        >
          <Plus size={15} />
          Nouveau voyage
        </button>
      </div>

      <Modal
        title="Nouveau voyage"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <CreateTripForm onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
