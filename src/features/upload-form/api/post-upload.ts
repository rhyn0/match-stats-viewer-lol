"use server";

import { matches } from "@/db/schema/match";
import { players } from "@/db/schema/player";
import { playerMatches } from "@/db/schema/player-match";
import { teams } from "@/db/schema/team";
import db from "@/lib/drizzle-db";
import { getServerSession } from "auth";
import { and, eq, inArray, or } from "drizzle-orm";

import type { UploadMatchT } from "../types";

export async function insertSingleMatch(data: UploadMatchT): Promise<void> {
    const session = await getServerSession();
    if (!session) {
        throw new Error("Must be Admin to add game results");
    }
    try {
        await db.transaction(async (tx) => {
            const teamIds = await db
                .select({
                    id: teams.id,
                    name: teams.teamName,
                    defaultName: teams.defaultName,
                })
                .from(teams)
                .where(
                    or(
                        inArray(teams.defaultName, [
                            data.matchRecord.blueTeamName,
                            data.matchRecord.redTeamName,
                        ]),
                        inArray(teams.teamName, [
                            data.matchRecord.blueTeamName,
                            data.matchRecord.redTeamName,
                        ]),
                    ),
                );
            const blueId = teamIds.find(
                (team) =>
                    data.matchRecord.blueTeamName === team.name ||
                    data.matchRecord.blueTeamName === team.defaultName,
            )?.id;
            const redId = teamIds.find(
                (team) =>
                    data.matchRecord.redTeamName === team.name ||
                    data.matchRecord.redTeamName === team.defaultName,
            )?.id;
            if (typeof blueId === "undefined" || typeof redId === "undefined") {
                throw new Error("Invalid team names");
            }
            const [{ matchId }] = await tx
                .update(matches)
                .set({
                    blueWon: data.matchRecord.blueWon,
                    playDate: data.matchRecord.playDate,
                })
                .where(
                    and(
                        eq(matches.blueTeam, blueId),
                        eq(matches.redTeam, redId),
                    ),
                )
                .returning({ matchId: matches.id });
            for (const {
                playerName,
                position,
                championName,
                kda,
            } of data.playerMatchRecords) {
                const [{ playerId }] = await tx
                    .insert(players)
                    // any player we insert is not on a team, probably a sub
                    .values({
                        name: playerName.slice(0, playerName.indexOf("#")),
                        summonerName: playerName,
                        designatedPosition: position,
                    })
                    .onConflictDoNothing({ target: players.name })
                    .returning({ playerId: players.id });
                await tx.insert(playerMatches).values({
                    playerId,
                    matchId,
                    rawKDA: kda.raw,
                    position: position,
                    playerChampionName: championName,
                    playerKills: kda.kills,
                    playerDeaths: kda.deaths,
                    playerAssists: kda.assists,
                });
            }
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
}
