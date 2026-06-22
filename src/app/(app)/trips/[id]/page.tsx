import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import TripHeader from "@/components/trips/trip-header";
import Tabs from "@/components/ui/tabs";
import ItineraryView from "@/components/itinerary/itinerary-view";
import BudgetView from "@/components/budget/budget-view";

const TABS = [
  { id: "itinerary", label: "Itinéraire" },
  { id: "budget", label: "Budget" },
];

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TripDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [
    { data: trip },
    { data: steps },
    { data: expenses },
    { data: activities },
  ] = await Promise.all([
    supabase.from("trips").select("*").eq("id", id).single(),
    supabase
      .from("trip_steps")
      .select("*")
      .eq("trip_id", id)
      .order("order_index", { ascending: true }),
    supabase
      .from("trip_expenses")
      .select("*")
      .eq("trip_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("trip_activities")
      .select("*")
      .eq("trip_id", id)
      .order("order_index", { ascending: true }),
  ]);

  if (!trip) notFound();

  const contents = {
    itinerary: (
      <ItineraryView
        trip={trip}
        steps={steps ?? []}
        activities={activities ?? []}
      />
    ),
    budget: (
      <BudgetView
        tripId={trip.id}
        expenses={expenses ?? []}
        budget={trip.budget}
      />
    ),
  };

  return (
    <div>
      <TripHeader trip={trip} />
      <Tabs tabs={TABS} contents={contents} />
    </div>
  );
}
