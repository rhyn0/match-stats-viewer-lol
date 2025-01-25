import db from "@/lib/drizzle-db";

import type { PlayerSelectT } from "@/db/schema/player";
import type { TeamSelectT } from "@/db/schema/team";

export const revalidate = 3600; // 1 hour in seconds

type TeamQueryPlayerRelT = TeamSelectT & {
    teamPlayersRel: PlayerSelectT[];
};

export async function GET() {
    const teams = (await db.query.teams.findMany({
        with: {
            teamPlayersRel: true,
        },
    })) as TeamQueryPlayerRelT[];

    return Response.json({
        data: teams.map((team) => ({
            ...team,
            players: team.teamPlayersRel.map((player) => ({
                ...player,
            })),
        })),
    });
}
