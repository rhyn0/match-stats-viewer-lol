import { type MatchSelectT, matches } from "@/db/schema/match";
import { and, asc, eq, isNotNull } from "drizzle-orm";
import type { Db } from "./types";

export type PlayoffMatchT = Pick<
    MatchSelectT,
    "blueTeam" | "redTeam" | "blueWon" | "playDate"
>;
export async function getPlayoffMatches(db: Db): Promise<PlayoffMatchT[]> {
    return db
        .select({
            blueTeam: matches.blueTeam,
            redTeam: matches.redTeam,
            blueWon: matches.blueWon,
            playDate: matches.playDate,
        })
        .from(matches)
        .where(and(isNotNull(matches.blueWon), eq(matches.isPlayoffs, true)))
        .orderBy(asc(matches.playDate));
}
