import type { PlayoffPredictSelectT } from "@/db/schema/playoff-predictions";
import type { AggregatedPredictionsT } from "../types";

export function aggregatePredictions(
    rows: PlayoffPredictSelectT[],
): AggregatedPredictionsT[] {
    const totalPredicts = rows.length;
    const aggs: AggregatedPredictionsT[] = Array.from({ length: 7 })
        .fill(null)
        .map((_, idx) => ({ matchId: idx + 1, blueWinOdds: 0, redWinOdds: 0 }));
    for (const row of rows) {
        setWin(aggs[0], row.result1);
        setWin(aggs[1], row.result2);
        setWin(aggs[2], row.result3);
        setWin(aggs[3], row.result4);
        setWin(aggs[4], row.result5);
        setWin(aggs[5], row.result6);
        setWin(aggs[6], row.result7);
    }
    if (totalPredicts > 0) {
        for (const agg of aggs) {
            agg.blueWinOdds /= totalPredicts;
            agg.redWinOdds /= totalPredicts;
        }
    }
    return aggs;
}

function setWin(agg: AggregatedPredictionsT, blueWin: boolean): void {
    if (blueWin) {
        agg.blueWinOdds += 1;
    } else {
        agg.redWinOdds += 1;
    }
}
