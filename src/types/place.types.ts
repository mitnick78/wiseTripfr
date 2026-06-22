export interface TripPlace {
  id: string;
  step_id: string;
  trip_id: string;
  title: string;
  notes?: string;
  lat: number;
  lng: number;
  created_at: string;
}

export type CreatePlacePayload = Omit<TripPlace, "id" | "created_at">;
