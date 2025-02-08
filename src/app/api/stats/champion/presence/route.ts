import { getChampionPresence } from "@/lib/crud/champ-presence";
import { getNumberPlayedMatches } from "@/lib/crud/matches";
import db from "@/lib/drizzle-db";

export const revalidate = 3600; // 1 hour in seconds

export async function GET() {
    const [presenceResult, numMatchesResult] = await Promise.allSettled([
        getChampionPresence(db),
        getNumberPlayedMatches(db),
    ]);
    if (
        presenceResult.status === "rejected" ||
        numMatchesResult.status === "rejected"
    ) {
        return new Response("Failed to query DB", { status: 500 });
    }
    const presence = presenceResult.value;
    const numMatches = numMatchesResult.value;

    const data = presence.map((row) => ({ ...row, totalMatches: numMatches }));

    return Response.json({ data });
}
