import "server-only";
import { matches } from "@/db/schema/match";
import { playerMatches } from "@/db/schema/player-match";

import { eq, sum } from "drizzle-orm";
import type { Db } from "./types";

export async function getTotalKillsByWeek(db: Db) {
    const rows = await db
        .select({
            gameWeek: matches.gameWeek,
            totalKills: sum(playerMatches.playerKills),
        })
        .from(matches)
        .innerJoin(playerMatches, eq(matches.id, playerMatches.matchId))
        .groupBy(matches.gameWeek);
    return rows.map((rec) => ({
        ...rec,
        totalKills: Number.parseInt(rec.totalKills ?? "0"),
    }));
}

export async function getTotalDeathsByWeek(db: Db) {
    const rows = await db
        .select({
            gameWeek: matches.gameWeek,
            totalDeaths: sum(playerMatches.playerDeaths),
        })
        .from(matches)
        .innerJoin(playerMatches, eq(matches.id, playerMatches.matchId))
        .groupBy(matches.gameWeek);
    return rows.map((rec) => ({
        ...rec,
        totalDeaths: Number.parseInt(rec.totalDeaths ?? "0"),
    }));
}

export async function getTotalAssistsByWeek(db: Db) {
    const rows = await db
        .select({
            gameWeek: matches.gameWeek,
            totalAssists: sum(playerMatches.playerAssists),
        })
        .from(matches)
        .innerJoin(playerMatches, eq(matches.id, playerMatches.matchId))
        .groupBy(matches.gameWeek);
    return rows.map((rec) => ({
        ...rec,
        totalAssists: Number.parseInt(rec.totalAssists ?? "0"),
    }));
}
