import { useSuspenseQuery } from "@tanstack/react-query";
import { queryAllPlayerStatsOptions } from "../api/list-player-stats";

import type { ExtraQueryOptionsI } from "@/types";
import type playerStatKeys from "../api/keys";
import type { OverallPlayerStatRecordT } from "../types";

type Key = (typeof playerStatKeys)["all"];

export interface UseListPlayerStatsQueryProps
    extends ExtraQueryOptionsI<OverallPlayerStatRecordT[], Key> {}
export default function useListPlayerStatsQuery({
    ...options
}: UseListPlayerStatsQueryProps = {}) {
    return useSuspenseQuery({
        ...queryAllPlayerStatsOptions(),
        ...options,
    });
}
