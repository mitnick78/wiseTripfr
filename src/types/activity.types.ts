export interface TripActivity {
  id: string;
  step_id: string;
  trip_id: string;
  title: string;
  notes?: string;
  lat?: number;
  lng?: number;
  order_index: number;
  created_at: string;
}
