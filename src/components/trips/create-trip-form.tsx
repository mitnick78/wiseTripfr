"use client";

import { createTripAction } from "@/actions/trips/create-trip.action";
import { useActionState } from "react";
import {
  inputClass,
  labelClass,
  btnPrimaryClass,
  btnSecondaryClass,
} from "@/lib/utils/styles";

const initialState = { error: "" };

export default function CreateTripForm({ onClose }: { onClose: () => void }) {
  const [state, formAction, isPending] = useActionState(
    createTripAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className={labelClass}>Titre du voyage</label>
        <input
          name="title"
          type="text"
          required
          placeholder="Ex: Road trip Californie"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Destination</label>
        <input
          name="destination"
          type="text"
          required
          placeholder="Ex: San Francisco, USA"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Date de début</label>
          <input
            name="start_date"
            type="date"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Date de fin</label>
          <input name="end_date" type="date" required className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Budget prévu</label>
        <div className="relative">
          <input
            name="budget"
            type="number"
            min="0"
            step="0.01"
            placeholder="0"
            defaultValue="0"
            className={`${inputClass} pr-12`}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">
            EUR
          </span>
        </div>
      </div>

      {state?.error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 px-4 py-2.5 rounded-xl">
          {state.error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose} className={btnSecondaryClass}>
          Annuler
        </button>
        <button type="submit" disabled={isPending} className={btnPrimaryClass}>
          {isPending ? "Création..." : "Créer le voyage"}
        </button>
      </div>
    </form>
  );
}
