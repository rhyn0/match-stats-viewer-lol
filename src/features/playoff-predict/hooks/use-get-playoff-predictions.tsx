import { useSuspenseQuery } from "@tanstack/react-query";
import { getPlayoffPredictionsQueryOptions } from "../api/get-playoff-predict-agg";

import type { ExtraQueryOptionsI } from "@/types";
import type playoffPredictKeys from "../api/keys";
import type { AggregatedPredictionsT } from "../types";

type Key = (typeof playoffPredictKeys)["predictions"];

export interface usePlayoffPredictQueryProps
    extends ExtraQueryOptionsI<AggregatedPredictionsT[], Key> {}
export default function usePlayoffPredictionsQuery({
    ...options
}: usePlayoffPredictQueryProps = {}) {
    return useSuspenseQuery({
        ...getPlayoffPredictionsQueryOptions(),
        ...options,
    });
}
