"use client";

import { addActivityAction } from "@/actions/activities/add-activity.action";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { inputClass, labelClass } from "@/lib/utils/styles";
import { X, Ticket } from "lucide-react";
import LocationInput from "@/components/ui/location-input";
import { GeoResult } from "@/lib/hooks/use-geocoding";

type ActionState = { error: string };
const initialState: ActionState = { error: "" };

interface Props {
  tripId: string;
  stepId: string;
  stepTitle: string;
  orderIndex: number;
  lat?: number;
  lng?: number;
  onClose: () => void;
}

export default function AddActivityForm({
  tripId,
  stepId,
  stepTitle,
  orderIndex,
  lat: initialLat,
  lng: initialLng,
  onClose,
}: Props) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    addActivityAction,
    initialState,
  );
  const [lat, setLat] = useState<number | undefined>(initialLat);
  const [lng, setLng] = useState<number | undefined>(initialLng);

  useEffect(() => {
    if (!isPending && !state.error && state !== initialState) {
      router.refresh();
      onClose();
    }
  }, [isPending, state]);

  const handleLocationSelect = (result: GeoResult) => {
    setLat(parseFloat(result.lat));
    setLng(parseFloat(result.lon));
  };

  return (
    <div className="bg-white border border-emerald-100 rounded-2xl p-5 mb-4 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
            <Ticket size={15} className="text-[#2D6A4F]" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-900">
              Ajouter une activité
            </p>
            <p className="text-xs text-stone-400">
              Dans :{" "}
              <span className="text-[#2D6A4F] font-medium">{stepTitle}</span>
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
        <input type="hidden" name="step_id" value={stepId} />
        <input type="hidden" name="order_index" value={orderIndex} />
        {lat && <input type="hidden" name="lat" value={lat} />}
        {lng && <input type="hidden" name="lng" value={lng} />}

        <div>
          <label className={labelClass}>
            Activité <span className="text-red-400">*</span>
          </label>
          <LocationInput
            name="title"
            placeholder="Ex: Musée du Louvre, Tour Eiffel..."
            onSelect={handleLocationSelect}
            required
          />
          {lat && lng && (
            <p className="mt-1 text-xs text-[#2D6A4F] flex items-center gap-1">
              ✓ Position enregistrée
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Notes</label>
          <textarea
            name="notes"
            rows={2}
            placeholder="Horaires, prix, réservation..."
            className={`${inputClass} resize-none`}
          />
        </div>

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
            {isPending ? "Ajout..." : "Ajouter"}
          </button>
        </div>
      </form>
    </div>
  );
}
