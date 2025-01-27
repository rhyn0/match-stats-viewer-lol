import { matches } from "@/db/schema/match";
import { matchBans } from "@/db/schema/match-bans";
import { playerMatches } from "@/db/schema/player-match";
import { eq, isNotNull, sql } from "drizzle-orm";

import type { Db } from "./types";

export type GetChampionPresenceOutputT = {
    id: number;
    /** CSV champion names */
    picks: string;
    /** CSV champion names */
    blueBans: string;
    /** CSV champion names */
    redBans: string;
};
export async function getChampionPresence(
    db: Db,
): Promise<GetChampionPresenceOutputT[]> {
    const result = await db
        .select({
            id: matches.id,
            picks: sql`group_concat(sq.picks)`.as("picks"),
            blueBans:
                sql`concat(${matchBans.blueBan1}, ',', ${matchBans.blueBan2}, ',', ${matchBans.blueBan3}, ',', ${matchBans.blueBan4}, ',', ${matchBans.blueBan5})`.as(
                    "blue_bans",
                ),
            redBans:
                sql`concat(${matchBans.redBan1}, ',', ${matchBans.redBan2}, ',', ${matchBans.redBan3}, ',', ${matchBans.redBan4}, ',', ${matchBans.redBan5})`.as(
                    "red_bans",
                ),
        })
        .from(matches)
        .innerJoin(
            db
                .select({
                    matchId: playerMatches.matchId,
                    picks: sql`group_concat(${playerMatches.playerChampionName})`.as(
                        "picks",
                    ),
                })
                .from(playerMatches)
                .groupBy(playerMatches.matchId)
                .as("sq"),
            eq(matches.id, sql.raw("sq.match_id")),
        )
        .leftJoin(matchBans, eq(matches.id, matchBans.matchId))
        .where(isNotNull(matches.blueWon))
        .groupBy(matches.id);

    return result as GetChampionPresenceOutputT[];
}
