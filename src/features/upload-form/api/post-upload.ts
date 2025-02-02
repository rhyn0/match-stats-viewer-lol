"use server";

import { matches } from "@/db/schema/match";
import { playerMatches } from "@/db/schema/player-match";
import { teams } from "@/db/schema/team";
import { selectOrInsertPlayer } from "@/lib/crud/players";
import db from "@/lib/drizzle-db";
import { getServerSession } from "auth";
import { and, eq, or } from "drizzle-orm";

import { matchBans } from "@/db/schema/match-bans";
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
            const result = await tx
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
            console.log("Creating player performances for match id - ", result);
            const matchId = result[0].matchId;
            await tx.insert(matchBans).values({
                matchId,
                // blue
                blueBan1: data.blueBans[1],
                blueBan2: data.blueBans[2],
                blueBan3: data.blueBans[3],
                blueBan4: data.blueBans[4],
                blueBan5: data.blueBans[5],
                // red
                redBan1: data.redBans[1],
                redBan2: data.redBans[2],
                redBan3: data.redBans[3],
                redBan4: data.redBans[4],
                redBan5: data.redBans[5],
            });
            for (
                let index = 0;
                index < data.playerMatchRecords.length;
                index++
            ) {
                const { playerName, position, championName, kda } =
                    data.playerMatchRecords[index];
                const bluePlayer = index < 5;
                const killParticipation =
                    (kda.kills + kda.assists) /
                    (bluePlayer ? data.blueTotalKills : data.redTotalKills);
                const [{ id: playerId }] = await selectOrInsertPlayer(tx, {
                    name: playerName.slice(0, playerName.indexOf("#")),
                    summonerName: playerName,
                    designatedPosition: position,
                });
                await tx.insert(playerMatches).values({
                    playerId,
                    matchId,
                    rawKDA: kda.raw,
                    position: position,
                    playerChampionName: championName,
                    playerKills: kda.kills,
                    playerDeaths: kda.deaths,
                    playerAssists: kda.assists,
                    killParticipation,
                    bluePlayer,
                });
            }
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
}
