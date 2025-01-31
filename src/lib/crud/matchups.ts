import "server-only";
import { matches } from "@/db/schema/match";
import { teams } from "@/db/schema/team";

import { aliasedTable, eq } from "drizzle-orm";
import type { Db } from "./types";

export async function listMatchesWithTeams(db: Db) {
    const blueTeam = aliasedTable(teams, "blueTeam");
    const redTeam = aliasedTable(teams, "redTeam");
    return await db
        .select({
            matchId: matches.id,
            gameWeek: matches.gameWeek,
            blueWon: matches.blueWon,
            blueTeamDefaultName: blueTeam.defaultName,
            blueTeamName: blueTeam.teamName,
            redTeamDefaultName: redTeam.defaultName,
            redTeamName: redTeam.teamName,
        })
        .from(matches)
        .leftJoin(blueTeam, eq(matches.blueTeam, blueTeam.id))
        .leftJoin(redTeam, eq(matches.redTeam, redTeam.id))
        .orderBy(matches.gameWeek, matches.id);
}
