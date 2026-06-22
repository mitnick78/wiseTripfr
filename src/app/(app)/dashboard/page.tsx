import { createClient } from "@/lib/supabase/server";
import TripCard from "@/components/trips/trip-card";
import DashboardHeader from "@/components/trips/dashboard-header";
import DashboardStats from "@/components/trips/dashboard-stats";
import { MapPin } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: trips } = await supabase
    .from("trips")
    .select("*")
    .order("created_at", { ascending: false });

  const tripList = trips ?? [];

  return (
    <div>
      <DashboardHeader tripCount={tripList.length} userEmail={user?.email} />

      {tripList.length > 0 && <DashboardStats trips={tripList} />}

      {tripList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tripList.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
            <MapPin size={28} className="text-[#BC4800]" />
          </div>
          <h2 className="text-lg font-semibold text-stone-900 mb-2">
            Aucun voyage pour l&apos;instant
          </h2>
          <p className="text-sm text-stone-400 max-w-xs">
            Crée ton premier voyage et commence à planifier ton aventure.
          </p>
        </div>
      )}
    </div>
  );
}
