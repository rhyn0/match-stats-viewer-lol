import { useSuspenseQuery } from "@tanstack/react-query";
import { getPlayoffTeamsQueryOptions } from "../api/get-playoff-teams";

import type { ExtraQueryOptionsI } from "@/types";
import type playoffPredictKeys from "../api/keys";
import type { PlayoffTeamT } from "../types";

type Key = (typeof playoffPredictKeys)["teams"];

export interface usePlayoffPredictQueryProps
    extends ExtraQueryOptionsI<PlayoffTeamT[], Key> {}
export default function usePlayoffTeamsQuery({
    ...options
}: usePlayoffPredictQueryProps = {}) {
    return useSuspenseQuery({
        ...getPlayoffTeamsQueryOptions(),
        ...options,
    });
}
