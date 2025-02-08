import { matches } from "@/db/schema/match";
import { matchBans } from "@/db/schema/match-bans";
import { playerMatches } from "@/db/schema/player-match";
import { type SQL, asc, count, eq, sql, sum } from "drizzle-orm";

import type {
    Champion,
    ChampionPresenceT,
} from "@/features/champion-presence/types";
import type { Db } from "./types";

type PresenceReturn = Omit<ChampionPresenceT, "totalMatches">;

export async function getChampionPresence(db: Db): Promise<PresenceReturn[]> {
    const bansCte = db
        .select({ champ: matchBans.blueBan1 })
        .from(matchBans)
        .unionAll(db.select({ champ: matchBans.blueBan2 }).from(matchBans))
        .unionAll(db.select({ champ: matchBans.blueBan3 }).from(matchBans))
        .unionAll(db.select({ champ: matchBans.blueBan4 }).from(matchBans))
        .unionAll(db.select({ champ: matchBans.blueBan5 }).from(matchBans))
        .unionAll(db.select({ champ: matchBans.redBan1 }).from(matchBans))
        .unionAll(db.select({ champ: matchBans.redBan2 }).from(matchBans))
        .unionAll(db.select({ champ: matchBans.redBan3 }).from(matchBans))
        .unionAll(db.select({ champ: matchBans.redBan4 }).from(matchBans))
        .unionAll(db.select({ champ: matchBans.redBan5 }).from(matchBans))
        .as("bans_cte");

    const bannedCounts = db
        .select({
            champName: bansCte.champ,
            timesBanned: count().as("timesBanned"),
        })
        .from(bansCte)
        .groupBy(bansCte.champ)
        .as("banned_counts");

    const result = await db
        .select({
            champName:
                playerMatches.playerChampionName as unknown as SQL<Champion>,
            wins: sum(sql`
          CASE 
            WHEN ${matches.blueWon} = 1 
                 AND ${playerMatches.playerChampionName} IN (
                   SELECT ${playerMatches.playerChampionName} 
                   FROM ${playerMatches} 
                   WHERE ${playerMatches.matchId} = ${matches.id} 
                     AND ${playerMatches.bluePlayer} = 1
                 ) 
            THEN 1 
            WHEN ${matches.blueWon} = 0 
                 AND ${playerMatches.playerChampionName} IN (
                   SELECT ${playerMatches.playerChampionName} 
                   FROM ${playerMatches} 
                   WHERE ${playerMatches.matchId} = ${matches.id} 
                     AND ${playerMatches.bluePlayer} = 0
                 ) 
            THEN 1 
          END
        `),
            losses: sum(sql`
          CASE 
            WHEN ${matches.blueWon} = 0 
                 AND ${playerMatches.playerChampionName} IN (
                   SELECT ${playerMatches.playerChampionName} 
                   FROM ${playerMatches} 
                   WHERE ${playerMatches.matchId} = ${matches.id} 
                     AND ${playerMatches.bluePlayer} = 1
                 ) 
            THEN 1 
            WHEN ${matches.blueWon} = 1 
                 AND ${playerMatches.playerChampionName} IN (
                   SELECT ${playerMatches.playerChampionName} 
                   FROM ${playerMatches} 
                   WHERE ${playerMatches.matchId} = ${matches.id} 
                     AND ${playerMatches.bluePlayer} = 0
                 ) 
            THEN 1 
          END
        `),
            timesBanned: sql<number>`COALESCE(${bannedCounts.timesBanned}, 0)`,
        })
        .from(playerMatches)
        .leftJoin(matches, eq(playerMatches.matchId, matches.id))
        .leftJoin(
            bannedCounts,
            eq(playerMatches.playerChampionName, bannedCounts.champName),
        )
        .groupBy(playerMatches.playerChampionName)
        .orderBy(asc(playerMatches.playerChampionName));
    return result.map((row) => ({
        ...row,
        wins: row.wins ? Number.parseInt(row.wins) : 0,
        losses: row.losses ? Number.parseInt(row.losses) : 0,
    }));
}
