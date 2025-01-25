import type { OverallPlayerStatQueryT } from "@/features/stats-player/types";
import { calculatePlayerStats } from "@/features/stats-player/utils/calculate-player-stats";
import db from "@/lib/drizzle-db";

export const revalidate = 3600; // 1 hour in seconds

export async function GET() {
    const queryRes = (await db.query.players.findMany({
        columns: {
            id: true,
            summonerName: true,
        },
        with: {
            playerMatchesRel: {
                columns: {
                    matchId: true,
                    position: true,
                    playerChampionName: true,
                    playerKills: true,
                    playerDeaths: true,
                    playerAssists: true,
                },
            },
            playerTeamRel: {
                columns: {
                    id: true,
                    defaultName: true,
                    teamName: true,
                },
            },
        },
    })) as OverallPlayerStatQueryT[];

    return Response.json({
        data: queryRes.map((res) => calculatePlayerStats(res)),
    });
}
