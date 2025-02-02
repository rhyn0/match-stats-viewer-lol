import { useSuspenseQuery } from "@tanstack/react-query";
import { getPositionKillsQueryOptions } from "../api/get-position-kills";

import type { ExtraQueryOptionsI } from "@/types";
import type positionStatsKeys from "../api/keys";
import type { PositionKillsT } from "../types";

type Key = (typeof positionStatsKeys)["kills"];

export interface usePositionKillsQueryProps
    extends ExtraQueryOptionsI<PositionKillsT[], Key> {}
export default function usePositionKillsQuery({
    ...options
}: usePositionKillsQueryProps = {}) {
    return useSuspenseQuery({
        ...getPositionKillsQueryOptions(),
        ...options,
    });
}
