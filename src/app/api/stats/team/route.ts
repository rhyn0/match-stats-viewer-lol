import { calculateTeamStats } from "@/features/stat-teams/utils/team-matches-to-stats";
import db from "@/lib/drizzle-db";

import type { TeamStatQueryT } from "@/features/stat-teams/types";

export const revalidate = 3600; // 1 hour in seconds

export async function GET() {
    const queryRes = (await db.query.teams.findMany({
        columns: {
            modifiedAt: false,
        },
        with: {
            matchesForTeamARel: {
                columns: {
                    blueWon: true,
                    gameTimeSeconds: true,
                },
            },
            matchesForTeamBRel: {
                columns: {
                    blueWon: true,
                    gameTimeSeconds: true,
                },
            },
        },
    })) as TeamStatQueryT[];

    return Response.json({
        data: queryRes.map((res) => calculateTeamStats(res)),
    });
}
