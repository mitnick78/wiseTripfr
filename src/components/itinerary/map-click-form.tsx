"use client";

import { addStepAction } from "@/actions/steps/add-step.action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, MapPin } from "lucide-react";
import { inputClass, labelClass } from "@/lib/utils/styles";

type ActionState = { error: string };
const initialState: ActionState = { error: "" };

interface Props {
  tripId: string;
  lat: number;
  lng: number;
  dayIndex: number;
  orderIndex: number;
  onClose: () => void;
}

export default function MapClickForm({
  tripId,
  lat,
  lng,
  dayIndex,
  orderIndex,
  onClose,
}: Props) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    addStepAction,
    initialState,
  );

  useEffect(() => {
    if (!isPending && !state.error && state !== initialState) {
      router.refresh();
      onClose();
    }
  }, [isPending, state]);

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-4 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
            <MapPin size={15} className="text-[#BC4800]" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-900">Nouvelle étape</p>
            <p className="text-xs text-stone-400">
              {lat.toFixed(4)}, {lng.toFixed(4)}
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
        {/* <input type="hidden" name="day_index" value={dayIndex} /> */}
        <input type="hidden" name="order_index" value={orderIndex} />
        <input type="hidden" name="lat" value={lat} />
        <input type="hidden" name="lng" value={lng} />

        <input
          name="title"
          type="text"
          required
          placeholder="Titre de l'étape *"
          className={inputClass}
        />

        <input
          name="location"
          type="text"
          placeholder="Lieu (optionnel)"
          className={inputClass}
        />

        <div className="grid grid-cols-2 gap-2">
          <select
            name="day_index"
            defaultValue={dayIndex}
            className={inputClass}
          >
            {Array.from({ length: 14 }, (_, i) => (
              <option key={i} value={i}>
                Jour {i + 1}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-1">
            <input name="start_time" type="time" className={inputClass} />
            <input name="end_time" type="time" className={inputClass} />
          </div>
        </div>

        <textarea
          name="notes"
          rows={2}
          placeholder="Notes..."
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
            className="flex-1 py-2 bg-[#BC4800] text-white rounded-xl text-sm font-medium hover:bg-[#963900] disabled:opacity-50 transition-colors"
          >
            {isPending ? "Ajout..." : "Ajouter"}
          </button>
        </div>
      </form>
    </div>
  );
}
