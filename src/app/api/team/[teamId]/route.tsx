import db from "@/lib/drizzle-db";
import { redirect } from "next/navigation";

import type { PlayerSelectT } from "@/db/schema/player";
import type { TeamSelectT } from "@/db/schema/team";

export const revalidate = 3600; // 1 hour in seconds

type TeamQueryPlayerRelT = TeamSelectT & {
    teamPlayersRel: PlayerSelectT[];
};

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ teamId: string }> },
) {
    const teamId = Number.parseInt((await params).teamId);
    const queryRes = (await db.query.teams.findFirst({
        where: (teams, { eq }) => eq(teams.id, teamId),
        with: {
            teamPlayersRel: true,
        },
    })) as TeamQueryPlayerRelT;
    if (!queryRes) {
        return redirect("/team/info");
    }
    return Response.json({
        data: { ...queryRes, players: queryRes.teamPlayersRel },
    });
}
