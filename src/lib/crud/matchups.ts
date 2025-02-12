import "server-only";
import { matches } from "@/db/schema/match";
import { players } from "@/db/schema/player";
import { playerMatches } from "@/db/schema/player-match";
import { teams } from "@/db/schema/team";
import { aliasedTable, eq, sql } from "drizzle-orm";

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

export async function getMatchDataByMatchId(db: Db, matchId: number) {
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
            gameTimeSeconds: matches.gameTimeSeconds,
            matchDate: matches.playDate,
            blueTeamPlayers: sql<
                string | null
            >`GROUP_CONCAT(CASE WHEN ${playerMatches.bluePlayer} = 1 THEN ${players.summonerName} || ' (' || ${playerMatches.position} || ' - ' || ${playerMatches.playerChampionName} || ' - ' || ${playerMatches.rawKDA} || ')' END, ', ')`,
            redTeamPlayers: sql<
                string | null
            >`GROUP_CONCAT(CASE WHEN ${playerMatches.bluePlayer} = 0 THEN ${players.summonerName} || ' (' || ${playerMatches.position} || ' - ' || ${playerMatches.playerChampionName} || ' - ' || ${playerMatches.rawKDA} || ')' END, ', ')`,
        })
        .from(matches)
        .leftJoin(blueTeam, eq(matches.blueTeam, blueTeam.id))
        .leftJoin(redTeam, eq(matches.redTeam, redTeam.id))
        .leftJoin(playerMatches, eq(matches.id, playerMatches.matchId))
        .leftJoin(players, eq(playerMatches.playerId, players.id))
        .where(eq(matches.id, matchId))
        .groupBy(matches.id);
}
