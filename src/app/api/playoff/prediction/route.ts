import { aggregatePredictions } from "@/features/playoff-predict/lib/aggregate-predictions";
import { selectPrediction } from "@/lib/crud/playoff-predictions";
import db from "@/lib/drizzle-db";

export const revalidate = 3600; // 1 hour in seconds

export async function GET() {
    const rows = await selectPrediction(db);
    const data = aggregatePredictions(rows);
    return Response.json({ data });
}
