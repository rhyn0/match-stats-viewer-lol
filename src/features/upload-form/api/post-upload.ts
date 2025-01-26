"use server";

import { matches } from "@/db/schema/match";
import { players } from "@/db/schema/player";
import { playerMatches } from "@/db/schema/player-match";
import { teams } from "@/db/schema/team";
import db from "@/lib/drizzle-db";
import { getServerSession } from "auth";
import { and, eq, or } from "drizzle-orm";

import type { UploadMatchT } from "../types";

export async function insertSingleMatch(data: UploadMatchT): Promise<void> {
    const session = await getServerSession();
    if (!session) {
        throw new Error("Must be Admin to add game results");
    }
    try {
        const [{ id: blueId }] = await db
            .select({
                id: teams.id,
            })
            .from(teams)
            .where(
                or(
                    eq(teams.defaultName, data.matchRecord.blueTeamName),
                    eq(teams.teamName, data.matchRecord.blueTeamName),
                ),
            );
        const [{ id: redId }] = await db
            .select({
                id: teams.id,
            })
            .from(teams)
            .where(
                or(
                    eq(teams.defaultName, data.matchRecord.redTeamName),
                    eq(teams.teamName, data.matchRecord.redTeamName),
                ),
            );
        console.log(
            "Starting transaction for match between (blue,red) : ",
            blueId,
            redId,
        );
        if (typeof blueId === "undefined" || typeof redId === "undefined") {
            throw new Error("Invalid team names");
        }
        await db.transaction(async (tx) => {
            const [{ matchId }] = await tx
                .update(matches)
                .set({
                    blueWon: data.matchRecord.blueWon,
                    playDate: data.matchRecord.playDate,
                    gameTimeSeconds: data.matchRecord.gameTimeSeconds,
                    isPlayoffs: data.isPlayoffs,
                })
                .where(
                    and(
                        eq(matches.blueTeam, blueId),
                        eq(matches.redTeam, redId),
                    ),
                )
                .returning({ matchId: matches.id });
            console.log(
                "Creating player performances for match id - ",
                matchId,
            );
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
