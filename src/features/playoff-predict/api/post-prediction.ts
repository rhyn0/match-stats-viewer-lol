"use server";

import "server-only";
import { insertPrediction } from "@/lib/crud/playoff-predictions";
import db from "@/lib/drizzle-db";

import type { PredictionFormT } from "../types";

export async function insertSinglePrediction(
    vals: PredictionFormT,
): Promise<void> {
    try {
        await insertPrediction(db, {
            email: vals.email,
            result1: vals.matches[0].winner === 0,
            result2: vals.matches[1].winner === 0,
            result3: vals.matches[2].winner === 0,
            result4: vals.matches[3].winner === 0,
            result5: vals.matches[4].winner === 0,
            result6: vals.matches[5].winner === 0,
            result7: vals.matches[6].winner === 0,
        });
    } catch (e) {
        console.error("Failed to insert a prediction", e);
        throw new Error("Failed to insert a prediction", { cause: e });
    }
}
