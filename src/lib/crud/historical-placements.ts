import { type PlacementSelectT, placements } from "@/db/schema/placements";
import { asc, eq } from "drizzle-orm";

import type { Db } from "./types";

export type TeamPlacementProbT = Omit<PlacementSelectT, "id">;

export async function getPlacementProbsForTeam(
    db: Db,
    teamId: number,
): Promise<TeamPlacementProbT[]> {
    return await db
        .select({
            teamId: placements.teamId,
            standing: placements.standing,
            probability: placements.probability,
            dateCreated: placements.dateCreated,
        })
        .from(placements)
        .where(eq(placements.teamId, teamId))
        .orderBy(asc(placements.dateCreated));
}
