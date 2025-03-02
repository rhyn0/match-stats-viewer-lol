import { getPlayoffMatches } from "@/lib/crud/playoff-matches";
import db from "@/lib/drizzle-db";

export const revalidate = 3600; // 1 hour in seconds

export async function GET() {
    const data = await getPlayoffMatches(db);
    // we only need to see the result of the games
    // no extra metadata (name) necessary
    return Response.json({ data });
}
