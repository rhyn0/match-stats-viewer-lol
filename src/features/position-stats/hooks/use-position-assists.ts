import { useSuspenseQuery } from "@tanstack/react-query";
import { getPositionAssistsQueryOptions } from "../api/get-position-assists";

import type { ExtraQueryOptionsI } from "@/types";
import type positionStatsKeys from "../api/keys";
import type { PositionAssistsT } from "../types";

type Key = (typeof positionStatsKeys)["assists"];

export interface usePositionAssistsQueryProps
    extends ExtraQueryOptionsI<PositionAssistsT[], Key> {}
export default function usePositionAssistsQuery({
    ...options
}: usePositionAssistsQueryProps = {}) {
    return useSuspenseQuery({
        ...getPositionAssistsQueryOptions(),
        ...options,
    });
}
