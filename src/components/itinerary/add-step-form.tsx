"use client";

import { addStepAction } from "@/actions/steps/add-step.action";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { labelClass, inputClass } from "@/lib/utils/styles";
import { Calendar, Hotel } from "lucide-react";
import LocationInput from "@/components/ui/location-input";
import { GeoResult } from "@/lib/hooks/use-geocoding";

type ActionState = { error: string };
const initialState: ActionState = { error: "" };

interface Props {
  tripId: string;
  orderIndex: number;
  lat?: number;
  lng?: number;
  onClose: () => void;
}

export default function AddStepForm({
  tripId,
  orderIndex,
  lat: initialLat,
  lng: initialLng,
  onClose,
}: Props) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    addStepAction,
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
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="trip_id" value={tripId} />
      <input type="hidden" name="order_index" value={orderIndex} />
      {lat && <input type="hidden" name="lat" value={lat} />}
      {lng && <input type="hidden" name="lng" value={lng} />}

      {/* Ville */}
      <div>
        <label className={labelClass}>
          Ville / Destination <span className="text-red-400">*</span>
        </label>
        <LocationInput
          name="title"
          placeholder="Ex: Paris, Tokyo, New York..."
          onSelect={handleLocationSelect}
          required
        />
        {lat && lng && (
          <p className="mt-1 text-xs text-[#2D6A4F] flex items-center gap-1">
            ✓ Position enregistrée ({lat.toFixed(3)}, {lng.toFixed(3)})
          </p>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#BC4800]" />
              Arrivée
            </span>
          </label>
          <input name="arrival_date" type="date" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Départ</label>
          <input name="departure_date" type="date" className={inputClass} />
        </div>
      </div>

      {/* Hébergement */}
      <div>
        <label className={labelClass}>
          <span className="flex items-center gap-1.5">
            <Hotel size={13} className="text-[#BC4800]" />
            Hébergement
          </span>
        </label>
        <input
          name="accommodation"
          type="text"
          placeholder="Ex: Hôtel Le Marais, Airbnb..."
          className={inputClass}
        />
      </div>

      {/* Notes */}
      <div>
        <label className={labelClass}>Notes</label>
        <textarea
          name="notes"
          rows={2}
          placeholder="Informations sur cette étape..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-2.5 rounded-xl">
          {state.error}
        </p>
      )}

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2.5 border border-stone-200 text-stone-600 rounded-xl text-sm hover:bg-stone-50 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 py-2.5 bg-[#BC4800] text-white rounded-xl text-sm font-medium hover:bg-[#963900] disabled:opacity-50 transition-colors"
        >
          {isPending ? "Ajout..." : "Ajouter l'étape"}
        </button>
      </div>
    </form>
  );
}
