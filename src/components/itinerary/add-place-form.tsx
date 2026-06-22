"use client";

import { addPlaceAction } from "@/actions/places/add-place.action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, X } from "lucide-react";
import { inputClass } from "@/lib/utils/styles";
import { TripStep } from "@/types/step.types";

type ActionState = { error: string };
const initialState: ActionState = { error: "" };

interface Props {
  tripId: string;
  step: TripStep;
  lat: number;
  lng: number;
  onClose: () => void;
}

export default function AddPlaceForm({
  tripId,
  step,
  lat,
  lng,
  onClose,
}: Props) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    addPlaceAction,
    initialState,
  );

  useEffect(() => {
    if (!isPending && !state.error && state !== initialState) {
      router.refresh();
      onClose();
    }
  }, [isPending, state]);

  return (
    <div className="bg-white border border-[#2D6A4F]/20 rounded-2xl p-5 mb-4 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
            <MapPin size={15} className="text-[#2D6A4F]" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-900">Lieu à visiter</p>
            <p className="text-xs text-stone-400">
              Dans :{" "}
              <span className="text-[#2D6A4F] font-medium">{step.title}</span>
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      <form action={formAction} className="space-y-3">
        <input type="hidden" name="trip_id" value={tripId} />
        <input type="hidden" name="step_id" value={step.id} />
        <input type="hidden" name="lat" value={lat} />
        <input type="hidden" name="lng" value={lng} />

        <input
          name="title"
          type="text"
          required
          placeholder="Ex: Musée du Louvre *"
          className={inputClass}
          autoFocus
        />

        <textarea
          name="notes"
          rows={2}
          placeholder="Notes (horaires, prix...)"
          className={`${inputClass} resize-none`}
        />

        {state?.error && (
          <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
            {state.error}
          </p>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 border border-stone-200 text-stone-600 rounded-xl text-sm hover:bg-stone-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 py-2 bg-[#2D6A4F] text-white rounded-xl text-sm font-medium hover:bg-[#1F5038] disabled:opacity-50 transition-colors"
          >
            {isPending ? "Ajout..." : "Ajouter le lieu"}
          </button>
        </div>
      </form>
    </div>
  );
}
