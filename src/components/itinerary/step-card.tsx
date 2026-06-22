"use client";

import { TripStep } from "@/types/step.types";
import { TripActivity } from "@/types/activity.types";
import { deleteStepAction } from "@/actions/steps/delete-step.action";
import { deleteActivityAction } from "@/actions/activities/delete-activity.action";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Trash2,
  MapPin,
  Calendar,
  Hotel,
  Plus,
  Ticket,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatDate } from "@/lib/utils/format";

interface Props {
  step: TripStep;
  tripId: string;
  index: number;
  dayColor: string;
  activities: TripActivity[];
  onAddActivity: (step: TripStep) => void;
}

export default function StepCard({
  step,
  tripId,
  index,
  dayColor,
  activities,
  onAddActivity,
}: Props) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const handleDeleteStep = async () => {
    if (!confirm("Supprimer cette étape et toutes ses activités ?")) return;
    await deleteStepAction(step.id, tripId);
    router.refresh();
  };

  const handleDeleteActivity = async (activityId: string) => {
    if (!confirm("Supprimer cette activité ?")) return;
    await deleteActivityAction(activityId, tripId);
    router.refresh();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border border-stone-200 rounded-2xl overflow-hidden group hover:border-stone-300 hover:shadow-sm transition-all"
    >
      {/* Header étape */}
      <div
        className="flex items-center gap-3 p-4"
        style={{ borderLeft: `3px solid ${dayColor}` }}
      >
        {/* Grip */}
        <button
          {...attributes}
          {...listeners}
          className="text-stone-300 hover:text-stone-500 cursor-grab active:cursor-grabbing shrink-0"
        >
          <GripVertical size={16} />
        </button>

        {/* Numéro */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: `${dayColor}18`, color: dayColor }}
        >
          {index + 1}
        </div>

        {/* Contenu */}
        <div
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <p className="text-sm font-semibold text-stone-900">{step.title}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
            {step.location && (
              <span className="flex items-center gap-1 text-xs text-stone-400">
                <MapPin size={10} />
                {step.location}
              </span>
            )}
            {(step.arrival_date || step.departure_date) && (
              <span className="flex items-center gap-1 text-xs text-stone-400">
                <Calendar size={10} />
                {step.arrival_date && formatDate(step.arrival_date)}
                {step.arrival_date && step.departure_date && " → "}
                {step.departure_date && formatDate(step.departure_date)}
              </span>
            )}
            {step.accommodation && (
              <span className="flex items-center gap-1 text-xs text-stone-400">
                <Hotel size={10} />
                {step.accommodation}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-xs text-stone-400 mr-1">
            {activities.length} activité{activities.length > 1 ? "s" : ""}
          </span>
          <button
            onClick={() => onAddActivity(step)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#2D6A4F] hover:bg-emerald-50 transition-colors"
            title="Ajouter une activité"
          >
            <Plus size={14} />
          </button>
          <button
            onClick={handleDeleteStep}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-300 hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Activités */}
      {isExpanded && activities.length > 0 && (
        <div className="px-4 pb-3 space-y-1.5 border-t border-stone-100 pt-3">
          {activities.map((activity, i) => (
            <div
              key={activity.id}
              className="flex items-start gap-2 group/activity py-1.5 px-2 rounded-lg hover:bg-stone-50 transition-colors"
            >
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5"
                style={{ borderColor: dayColor }}
              >
                <span
                  className="text-[9px] font-bold"
                  style={{ color: dayColor }}
                >
                  {i + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-stone-700">
                  {activity.title}
                </p>
                {activity.notes && (
                  <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                    <FileText size={10} />
                    {activity.notes}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDeleteActivity(activity.id)}
                className="opacity-0 group-hover/activity:opacity-100 text-stone-300 hover:text-red-400 transition-all shrink-0"
              >
                <Trash2 size={11} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Bouton ajouter activité si vide */}
      {isExpanded && activities.length === 0 && (
        <div className="px-4 pb-3 pt-2 border-t border-stone-100">
          <button
            onClick={() => onAddActivity(step)}
            className="w-full py-2 border border-dashed border-stone-200 rounded-xl text-xs text-stone-400 hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-colors flex items-center justify-center gap-1.5"
          >
            <Ticket size={12} />
            Ajouter une activité
          </button>
        </div>
      )}
    </div>
  );
}
