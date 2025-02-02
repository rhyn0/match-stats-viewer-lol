import { useSuspenseQuery } from "@tanstack/react-query";
import { getPositionDeathsQueryOptions } from "../api/get-position-deaths";

import type { ExtraQueryOptionsI } from "@/types";
import type positionStatsKeys from "../api/keys";
import type { PositionDeathsT } from "../types";

type Key = (typeof positionStatsKeys)["deaths"];

export interface usePositionDeathsQueryProps
    extends ExtraQueryOptionsI<PositionDeathsT[], Key> {}
export default function usePositionDeathsQuery({
    ...options
}: usePositionDeathsQueryProps = {}) {
    return useSuspenseQuery({
        ...getPositionDeathsQueryOptions(),
        ...options,
    });
}
