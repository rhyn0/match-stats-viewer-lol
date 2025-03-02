import { useSuspenseQuery } from "@tanstack/react-query";
import { getPlayoffMatchesQueryOptions } from "../api/get-playoff-matches";

import type { ExtraQueryOptionsI } from "@/types";
import type playoffPredictKeys from "../api/keys";
import type { PlayoffMatchT } from "../types";

type Key = (typeof playoffPredictKeys)["matches"];

export interface usePlayoffPredictQueryProps
    extends ExtraQueryOptionsI<PlayoffMatchT[], Key> {}
export default function usePlayoffMatchesQuery({
    ...options
}: usePlayoffPredictQueryProps = {}) {
    return useSuspenseQuery({
        ...getPlayoffMatchesQueryOptions(),
        ...options,
    });
}
