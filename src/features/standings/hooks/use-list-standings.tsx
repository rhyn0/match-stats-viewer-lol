import { useSuspenseQuery } from "@tanstack/react-query";
import { listStandingsQueryOptions } from "../api/list-standings";

import type { ExtraQueryOptionsI } from "@/types";
import type standingsKeys from "../api/keys";
import type { TeamStandingsT } from "../types";

type Key = (typeof standingsKeys)["all"];

export interface useListStandingsQueryProps
    extends ExtraQueryOptionsI<TeamStandingsT[], Key> {}
export default function useListStandingsQuery({
    ...options
}: useListStandingsQueryProps = {}) {
    return useSuspenseQuery({
        ...listStandingsQueryOptions(),
        ...options,
    });
}
