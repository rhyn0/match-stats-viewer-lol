import { getChampionPresence } from "@/lib/crud/champ-presence";
import db from "@/lib/drizzle-db";

export const revalidate = 3600; // 1 hour in seconds

export async function GET() {
    const presence = await getChampionPresence(db);

    const arrayPresence = presence.map((p) => ({
        ...p,
        picks: p.picks.split(","),
        blueBans: p.blueBans.split(","),
        redBans: p.redBans.split(","),
    }));

    return Response.json({
        data: arrayPresence,
    });
}
