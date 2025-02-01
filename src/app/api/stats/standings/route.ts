import { getTeamStandings } from "@/lib/crud/standings";
import db from "@/lib/drizzle-db";

export const revalidate = 7200; // 2 hour in seconds

export async function GET() {
    const standings = await getTeamStandings(db);

    const data = standings.map((stand) => ({
        ...stand,
        beat: stand.beat?.split(",").map((v) => Number.parseInt(v)) ?? [],
    }));

    return Response.json({
        data,
    });
}
