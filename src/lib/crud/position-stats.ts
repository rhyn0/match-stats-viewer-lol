import "server-only";
import { playerMatches } from "@/db/schema/player-match";
import { sum } from "drizzle-orm";

import type { Db } from "./types";

export async function getKillsPerPosition(db: Db) {
    const rows = await db
        .select({
            position: playerMatches.position,
            totalKills: sum(playerMatches.playerKills),
        })
        .from(playerMatches)
        .groupBy(playerMatches.position);
    return rows.map((rec) => ({
        ...rec,
        totalKills: Number.parseInt(rec.totalKills ?? "0"),
    }));
}

export async function getDeathsPerPosition(db: Db) {
    const rows = await db
        .select({
            position: playerMatches.position,
            totalDeaths: sum(playerMatches.playerDeaths),
        })
        .from(playerMatches)
        .groupBy(playerMatches.position);
    return rows.map((rec) => ({
        ...rec,
        totalDeaths: Number.parseInt(rec.totalDeaths ?? "0"),
    }));
}

export async function getAssistsPerPosition(db: Db) {
    const rows = await db
        .select({
            position: playerMatches.position,
            totalAssists: sum(playerMatches.playerAssists),
        })
        .from(playerMatches)
        .groupBy(playerMatches.position);
    return rows.map((rec) => ({
        ...rec,
        totalAssists: Number.parseInt(rec.totalAssists ?? "0"),
    }));
}
