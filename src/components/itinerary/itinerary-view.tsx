"use client";

import { useState } from "react";
import { TripStep } from "@/types/step.types";
import { TripActivity } from "@/types/activity.types";
import { Trip } from "@/types/trip.types";
import { reorderStepsAction } from "@/actions/steps/reorder-steps.action";
import dynamic from "next/dynamic";
import StepCard from "./step-card";
import AddStepForm from "./add-step-form";
import AddActivityForm from "./add-activity-form";
import Modal from "@/components/ui/modal";
import { Map, List, LayoutPanelLeft, Plus, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

const TripMap = dynamic(() => import("./trip-map"), { ssr: false });
const DndContextClient = dynamic(
  () => import("@dnd-kit/core").then((mod) => ({ default: mod.DndContext })),
  { ssr: false },
);

type ClickMode = "step" | "activity";

interface Props {
  trip: Trip;
  steps: TripStep[];
  activities: TripActivity[];
}

export default function ItineraryView({ trip, steps, activities }: Props) {
  const router = useRouter();
  const [view, setView] = useState<"both" | "map" | "list">("both");
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [clickMode, setClickMode] = useState<ClickMode>("step");
  const [activeStep, setActiveStep] = useState<TripStep | null>(null);
  const [pendingCoords, setPendingCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [activityTarget, setActivityTarget] = useState<TripStep | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleMapClick = (lat: number, lng: number) => {
    if (clickMode === "activity") {
      if (!activeStep) return;
      setPendingCoords({ lat, lng });
      setActivityTarget(activeStep);
    } else {
      setPendingCoords({ lat, lng });
      setIsStepModalOpen(true);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = steps.findIndex((s) => s.id === active.id);
    const newIndex = steps.findIndex((s) => s.id === over.id);
    const reordered = arrayMove(steps, oldIndex, newIndex);

    await reorderStepsAction(
      reordered.map((s, i) => ({ id: s.id, order_index: i })),
      trip.id,
    );
    router.refresh();
  };

  const VIEW_OPTIONS = [
    { id: "both", icon: <LayoutPanelLeft size={14} />, label: "Carte + Liste" },
    { id: "map", icon: <Map size={14} />, label: "Carte" },
    { id: "list", icon: <List size={14} />, label: "Liste" },
  ];

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
          {VIEW_OPTIONS.map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id as typeof view)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                view === v.id
                  ? "bg-white text-stone-900 shadow-sm border border-stone-200"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {v.icon}
              <span className="hidden sm:block">{v.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            setPendingCoords(null);
            setIsStepModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#BC4800] text-white text-sm font-medium rounded-xl hover:bg-[#963900] transition-colors"
        >
          <Plus size={14} />
          Nouvelle étape
        </button>
      </div>

      {/* Carte */}
      {(view === "both" || view === "map") && (
        <div className="mb-5">
          {/* Mode clic */}
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            {/* Sélecteur d'étape en mode activité */}
            {clickMode === "activity" && (
              <div className="flex items-center gap-2">
                <select
                  className="text-xs border border-stone-200 rounded-lg px-2 py-1.5 bg-white text-stone-600 focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                  value={activeStep?.id ?? ""}
                  onChange={(e) => {
                    const step =
                      steps.find((s) => s.id === e.target.value) ?? null;
                    setActiveStep(step);
                  }}
                >
                  <option value="">— Dans quelle étape ? —</option>
                  {steps.map((step, i) => (
                    <option key={step.id} value={step.id}>
                      {i + 1}. {step.title}
                    </option>
                  ))}
                </select>
                {!activeStep && (
                  <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                    <Info size={11} />
                    Choisis une étape
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="rounded-2xl overflow-hidden border border-stone-200">
            <TripMap
              steps={steps}
              activities={activities}
              activeStep={activeStep}
              onMapClick={handleMapClick}
            />
          </div>
        </div>
      )}

      {/* Formulaire activité après clic carte */}
      {pendingCoords && clickMode === "activity" && activityTarget && (
        <AddActivityForm
          tripId={trip.id}
          stepId={activityTarget.id}
          stepTitle={activityTarget.title}
          orderIndex={
            activities.filter((a) => a.step_id === activityTarget.id).length
          }
          lat={pendingCoords.lat}
          lng={pendingCoords.lng}
          onClose={() => {
            setPendingCoords(null);
            setActivityTarget(null);
          }}
        />
      )}

      {/* Liste des étapes */}
      {(view === "both" || view === "list") && (
        <div className="mt-2">
          {steps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-stone-200 rounded-2xl">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-3">
                <Map size={20} className="text-[#BC4800]" />
              </div>
              <p className="text-sm font-medium text-stone-700 mb-1">
                Aucune étape pour l&apos;instant
              </p>
              <p className="text-xs text-stone-400 max-w-xs">
                Clique sur &quot;Nouvelle étape&quot; ou directement sur la
                carte pour commencer à planifier.
              </p>
            </div>
          ) : (
            <DndContextClient
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={steps.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {steps.map((step, i) => {
                    const stepActivities = activities
                      .filter((a) => a.step_id === step.id)
                      .sort((a, b) => a.order_index - b.order_index);

                    return (
                      <StepCard
                        key={step.id}
                        step={step}
                        tripId={trip.id}
                        index={i}
                        dayColor={
                          [
                            "#BC4800",
                            "#185FA5",
                            "#2D6A4F",
                            "#854F0B",
                            "#6D3A9C",
                            "#A32D2D",
                          ][i % 6]
                        }
                        activities={stepActivities}
                        onAddActivity={(step) => {
                          setActivityTarget(step);
                          setPendingCoords(null);
                        }}
                      />
                    );
                  })}
                </div>
              </SortableContext>
            </DndContextClient>
          )}
        </div>
      )}

      {/* Formulaire activité depuis bouton liste */}
      {activityTarget && !pendingCoords && (
        <div className="mt-4">
          <AddActivityForm
            tripId={trip.id}
            stepId={activityTarget.id}
            stepTitle={activityTarget.title}
            orderIndex={
              activities.filter((a) => a.step_id === activityTarget.id).length
            }
            onClose={() => setActivityTarget(null)}
          />
        </div>
      )}

      {/* Modal nouvelle étape */}
      <Modal
        title="Nouvelle étape"
        isOpen={isStepModalOpen}
        onClose={() => {
          setIsStepModalOpen(false);
          setPendingCoords(null);
        }}
      >
        <AddStepForm
          tripId={trip.id}
          orderIndex={steps.length}
          lat={pendingCoords?.lat}
          lng={pendingCoords?.lng}
          onClose={() => {
            setIsStepModalOpen(false);
            setPendingCoords(null);
          }}
        />
      </Modal>
    </div>
  );
}
