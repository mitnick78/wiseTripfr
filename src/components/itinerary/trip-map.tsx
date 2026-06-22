"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { TripStep } from "@/types/step.types";
import { TripActivity } from "@/types/activity.types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DAY_COLORS = [
  "#BC4800",
  "#185FA5",
  "#2D6A4F",
  "#854F0B",
  "#6D3A9C",
  "#A32D2D",
];

// Grande épingle pour les étapes (villes)
const createStepIcon = (color: string, label: string) =>
  L.divIcon({
    html: `
      <div style="position:relative;width:36px;height:44px;">
        <div style="
          background:${color};
          color:white;
          width:36px;height:36px;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          display:flex;align-items:center;justify-content:center;
          font-size:13px;font-weight:700;
          border:3px solid white;
          box-shadow:0 3px 8px rgba(0,0,0,0.3);
        ">
          <span style="transform:rotate(45deg)">${label}</span>
        </div>
      </div>
    `,
    className: "",
    iconSize: [36, 44],
    iconAnchor: [18, 44],
  });

// Petit cercle pour les activités
const createActivityIcon = (color: string) =>
  L.divIcon({
    html: `
      <div style="
        background:white;
        width:16px;height:16px;
        border-radius:50%;
        border:2.5px solid ${color};
        box-shadow:0 1px 4px rgba(0,0,0,0.2);
        display:flex;align-items:center;justify-content:center;
      ">
        <div style="width:6px;height:6px;border-radius:50%;background:${color};"></div>
      </div>
    `,
    className: "",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

interface ClickHandlerProps {
  onMapClick: (lat: number, lng: number) => void;
}

function ClickHandler({ onMapClick }: ClickHandlerProps) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface Props {
  steps: TripStep[];
  activities: TripActivity[];
  activeStep: TripStep | null;
  onMapClick: (lat: number, lng: number) => void;
}

export default function TripMap({
  steps,
  activities,
  activeStep,
  onMapClick,
}: Props) {
  const stepsWithCoords = steps.filter((s) => s.lat && s.lng);
  const activitiesWithCoords = activities.filter((a) => a.lat && a.lng);

  const center: [number, number] =
    stepsWithCoords.length > 0
      ? [stepsWithCoords[0].lat!, stepsWithCoords[0].lng!]
      : [48.8566, 2.3522];

  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden border border-stone-200">
      <MapContainer
        center={center}
        zoom={stepsWithCoords.length > 0 ? 6 : 4}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onMapClick={onMapClick} />

        {/* Étapes — grande épingle */}
        {stepsWithCoords.map((step, index) => {
          const color = DAY_COLORS[index % DAY_COLORS.length];
          const isActive = activeStep?.id === step.id;
          return (
            <Marker
              key={`step-${step.id}`}
              position={[step.lat!, step.lng!]}
              icon={createStepIcon(
                isActive ? "#BC4800" : color,
                String(index + 1),
              )}
            >
              <Popup>
                <div className="text-sm min-w-[160px]">
                  <p className="font-bold text-stone-900 mb-1">
                    📍 {step.title}
                  </p>
                  {step.accommodation && (
                    <p className="text-xs text-stone-500">
                      🏨 {step.accommodation}
                    </p>
                  )}
                  {(step.arrival_date || step.departure_date) && (
                    <p className="text-xs text-stone-400 mt-0.5">
                      {step.arrival_date} → {step.departure_date}
                    </p>
                  )}
                  {step.notes && (
                    <p className="text-xs text-stone-400 mt-1 italic">
                      {step.notes}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Activités — petit cercle */}
        {activitiesWithCoords.map((activity) => {
          const parentStep = steps.find((s) => s.id === activity.step_id);
          const stepIndex = steps.findIndex((s) => s.id === activity.step_id);
          const color = DAY_COLORS[stepIndex % DAY_COLORS.length];
          return (
            <Marker
              key={`activity-${activity.id}`}
              position={[activity.lat!, activity.lng!]}
              icon={createActivityIcon(color)}
            >
              <Popup>
                <div className="text-sm min-w-[140px]">
                  <p className="font-semibold text-stone-900">
                    {activity.title}
                  </p>
                  {parentStep && (
                    <p className="text-xs text-stone-400 mt-0.5">
                      Étape : {parentStep.title}
                    </p>
                  )}
                  {activity.notes && (
                    <p className="text-xs text-stone-400 mt-1 italic">
                      {activity.notes}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
