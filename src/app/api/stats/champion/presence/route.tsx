import { getChampionPresence } from "@/lib/crud/champ-presence";
import db from "@/lib/drizzle-db";

export const revalidate = 3600; // 1 hour in seconds

export async function GET() {
    const presence = await getChampionPresence(db);

    const arrayPresence = presence.map((p) => ({
        ...p,
        picks: p.picks.split(","),
        // bans can be null due to 'empty' ban.
        // filter these results to avoid them
        blueBans: p.blueBans.split(",").filter((b) => b.length > 0),
        redBans: p.redBans.split(",").filter((b) => b.length > 0),
    }));

    return Response.json({
        data: arrayPresence,
    });
}
