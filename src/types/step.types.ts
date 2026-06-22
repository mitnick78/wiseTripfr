export interface TripStep {
  id: string;
  trip_id: string;
  day_index: number;
  order_index: number;
  title: string;
  location?: string;
  notes?: string;
  start_time?: string;
  end_time?: string;
  lat?: number;
  lng?: number;
  arrival_date?: string;
  departure_date?: string;
  accommodation?: string;
  accommodation_lat?: number;
  accommodation_lng?: number;
  created_at: string;
}

export type CreateStepPayload = Pick<
  TripStep,
  "trip_id" | "day_index" | "order_index" | "title"
> &
  Partial<
    Pick<
      TripStep,
      "location" | "notes" | "start_time" | "end_time" | "lat" | "lng"
    >
  >;
