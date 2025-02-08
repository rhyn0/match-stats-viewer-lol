import { matches } from "@/db/schema/match";

import { count, isNotNull } from "drizzle-orm";
import type { Db } from "./types";

export async function getNumberPlayedMatches(db: Db): Promise<number> {
    const [result] = await db
        .select({ count: count() })
        .from(matches)
        .where(isNotNull(matches.blueWon));
    return result.count;
}
