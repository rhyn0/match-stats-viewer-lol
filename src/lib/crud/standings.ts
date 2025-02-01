import "server-only";
import { matches } from "@/db/schema/match";
import { type TeamSelectT, teams } from "@/db/schema/team";
import { type SQL, count, eq, isNotNull, not, sql } from "drizzle-orm";
import type { Db } from "./types";

type GetTeamStandingsReturnT = {
    teamId: TeamSelectT["id"];
    teamDefaultName: TeamSelectT["defaultName"];
    teamName: TeamSelectT["teamName"];
    win: number;
    loss: number;
    totalGames: number;
    beat: string | null;
};

export async function getTeamStandings(
    db: Db,
): Promise<GetTeamStandingsReturnT[]> {
    const sqBlue = db
        .select({
            team: matches.blueTeam,
            won: matches.blueWon,
            opponent: matches.redTeam,
        })
        .from(matches)
        .where(isNotNull(matches.blueWon))
        .unionAll(
            db
                .select({
                    team: matches.redTeam,
                    won: not(matches.blueWon) as SQL<boolean>,
                    opponent: matches.blueTeam,
                })
                .from(matches)
                .where(isNotNull(matches.blueWon)),
        )
        .as("sq");

    return await db
        .select({
            teamId: sqBlue.team,
            teamDefaultName: teams.defaultName,
            teamName: teams.teamName,
            win: sql<number>`sum(case when ${sqBlue.won} = 1 then 1 else 0 end)`,
            loss: sql<number>`sum(case when ${sqBlue.won} = 0 then 1 else 0 end)`,
            totalGames: count(),
            beat: sql<
                string | null
            >`group_concat(case when ${sqBlue.won} = 1 THEN ${sqBlue.opponent} END)`,
        })
        .from(sqBlue)
        .innerJoin(teams, eq(sqBlue.team, teams.id))
        .groupBy(sqBlue.team);
}
