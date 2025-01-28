import { useSuspenseQuery } from "@tanstack/react-query";
import {
    type GetTeamReturnI,
    queryTeamByIdQueryOptions,
} from "../api/get-team";

import type { ExtraQueryOptionsI } from "@/types";
import type { KeyT } from "../api/keys";

type Key = ReturnType<KeyT["detail"]>;

export interface useGetTeamsQueryProps
    extends ExtraQueryOptionsI<GetTeamReturnI, Key> {
    teamId: number;
}
export default function useTeamIdQuery({
    teamId,
    ...options
}: useGetTeamsQueryProps) {
    return useSuspenseQuery({
        ...queryTeamByIdQueryOptions(teamId),
        ...options,
    });
}
