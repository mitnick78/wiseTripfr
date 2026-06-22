export type TripStatus = "draft" | "planned" | "ongoing" | "completed";

export interface Trip {
  id: string;
  user_id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  cover_image?: string;
  status: TripStatus;
  is_shared: boolean;
  budget: number;
  created_at: string;
}

export type CreateTripPayload = Pick<
  Trip,
  "title" | "destination" | "start_date" | "end_date" | "budget"
>;

export type UpdateTripPayload = Partial<CreateTripPayload> & {
  status?: TripStatus;
  cover_image?: string;
  is_shared?: boolean;
};
