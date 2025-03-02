import {
    type PlayoffPredictInsertT,
    type PlayoffPredictSelectT,
    playoffPredictions,
} from "@/db/schema/playoff-predictions";
import type { Db } from "./types";

export async function selectPrediction(
    db: Db,
): Promise<PlayoffPredictSelectT[]> {
    return await db.select().from(playoffPredictions);
}

export async function insertPrediction(
    db: Db,
    values: PlayoffPredictInsertT,
): Promise<void> {
    await db.insert(playoffPredictions).values(values);
}
