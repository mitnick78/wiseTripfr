"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface ReorderPayload {
  id: string;
  order_index: number;
}

export async function reorderStepsAction(
  steps: ReorderPayload[],
  tripId: string,
) {
  const supabase = await createClient();

  const updates = steps.map(({ id, order_index }) =>
    supabase.from("trip_steps").update({ order_index }).eq("id", id),
  );

  await Promise.all(updates);

  revalidatePath(`/trips/${tripId}`);
  return { error: "" };
}
