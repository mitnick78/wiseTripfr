"use client";

import { updateTripAction } from "@/actions/trips/update-trip.action";
import { useActionState, useEffect } from "react";
import { Trip } from "@/types/trip.types";
import { useRouter } from "next/navigation";
import {
  inputClass,
  labelClass,
  btnPrimaryClass,
  btnSecondaryClass,
} from "@/lib/utils/styles";

type ActionState = { error: string };
const initialState: ActionState = { error: "" };

export default function EditTripForm({
  trip,
  onClose,
}: {
  trip: Trip;
  onClose: () => void;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    updateTripAction,
    initialState,
  );

  useEffect(() => {
    if (!isPending && !state.error && state !== initialState) {
      router.refresh();
      onClose();
    }
  }, [isPending, state]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="tripId" value={trip.id} />

      <div>
        <label className={labelClass}>Titre</label>
        <input
          name="title"
          type="text"
          required
          defaultValue={trip.title}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Destination</label>
        <input
          name="destination"
          type="text"
          required
          defaultValue={trip.destination}
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
            defaultValue={trip.start_date}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Date de fin</label>
          <input
            name="end_date"
            type="date"
            required
            defaultValue={trip.end_date}
            className={inputClass}
          />
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
            defaultValue={trip.budget}
            className={`${inputClass} pr-12`}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">
            EUR
          </span>
        </div>
      </div>

      <div>
        <label className={labelClass}>Statut</label>
        <select name="status" defaultValue={trip.status} className={inputClass}>
          <option value="draft">Brouillon</option>
          <option value="planned">Planifié</option>
          <option value="ongoing">En cours</option>
          <option value="completed">Terminé</option>
        </select>
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
          {isPending ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </div>
    </form>
  );
}
