import { useQuery } from "@tanstack/react-query";
import { getPlayedMatchQueryOptions } from "../api/get-match-detail";

import type { ExtraQueryOptionsI } from "@/types";
import type scheduleKeys from "../api/keys";
import type { PlayedMatchDetailsT } from "../types";

type Key = ReturnType<(typeof scheduleKeys)["detail"]>;

export interface useScheduleQueryProps
    extends ExtraQueryOptionsI<PlayedMatchDetailsT, Key> {
    id: string | number;
}
export default function useGetPlayedMatchQuery({
    id,
    ...options
}: useScheduleQueryProps) {
    return useQuery({
        ...getPlayedMatchQueryOptions(id),
        ...options,
    });
}
