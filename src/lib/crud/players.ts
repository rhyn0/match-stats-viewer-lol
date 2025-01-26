import {
    type PlayerInsertT,
    type PlayerSelectT,
    players,
} from "@/db/schema/player";
import { eq } from "drizzle-orm";
import type { Db } from "./types";

export async function selectPlayerBySummonerName(db: Db, name: string) {
    return await db
        .select()
        .from(players)
        .where(eq(players.summonerName, name));
}
export async function insertPlayerConflictNothing(
    db: Db,
    values: PlayerInsertT,
): Promise<{ status: "success" | "failure" }[] | PlayerSelectT[]> {
    return await db
        .insert(players)
        .values(values)
        .onConflictDoNothing({ target: players.summonerName })
        .returning();
}

export async function selectOrInsertPlayer(db: Db, values: PlayerInsertT) {
    const insertResult = await insertPlayerConflictNothing(db, values);
    console.log("After inserting got result", insertResult);
    // @ts-expect-error - have to figure out if it is a weird tyupe
    if (insertResult.length === 0 || insertResult[0]?.status) {
        // conflict occurred and it doesn't return existing column
        return await selectPlayerBySummonerName(db, values.summonerName);
    }
    console.log("Returning insertionReturning result because it had no status");
    return insertResult as PlayerSelectT[];
}
