import { useSuspenseQuery } from "@tanstack/react-query";
import { queryListTeamStatsOptions } from "../api/get-all-team-stats";

import type { ExtraQueryOptionsI } from "@/types";
import type teamStatKeys from "../api/keys";
import type { TeamGameDataT } from "../types";

type Key = (typeof teamStatKeys)["all"];

export interface useListTeamStatsQueryProps
    extends ExtraQueryOptionsI<TeamGameDataT[], Key> {}
export default function useListTeamStatsQuery({
    ...options
}: useListTeamStatsQueryProps = {}) {
    return useSuspenseQuery({
        ...queryListTeamStatsOptions(),
        ...options,
    });
}
