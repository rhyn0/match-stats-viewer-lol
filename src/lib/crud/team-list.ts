import { type TeamSelectT, teams } from "@/db/schema/team";
import { asc, sql } from "drizzle-orm";

import type { Db } from "./types";

export type TeamListT = Omit<TeamSelectT, "modifiedAt" | "defaultName">;

export async function listTeamIdNames(db: Db): Promise<TeamListT[]> {
    return await db
        .select({
            id: teams.id,
            teamName: sql<string>`COALESCE(${teams.teamName}, ${teams.defaultName})`,
        })
        .from(teams)
        .orderBy(asc(teams.id));
}
