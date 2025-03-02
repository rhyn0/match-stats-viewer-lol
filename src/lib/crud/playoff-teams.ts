import { type TeamSelectT, teams } from "@/db/schema/team";
import { asc, isNotNull } from "drizzle-orm";
import type { Db } from "./types";

export async function getPlayoffTeams(
    db: Db,
): Promise<Omit<TeamSelectT, "modifiedAt">[]> {
    return db
        .select({
            id: teams.id,
            defaultName: teams.defaultName,
            teamName: teams.teamName,
            playoffRank: teams.playoffRank,
        })
        .from(teams)
        .where(isNotNull(teams.playoffRank))
        .orderBy(asc(teams.playoffRank));
}
