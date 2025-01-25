import { useSuspenseQuery } from "@tanstack/react-query";
import {
    type ListTeamReturnI,
    queryAllTeamsQueryOptions,
} from "../api/list-teams";

import type { ExtraQueryOptionsI } from "@/types";
import type teamKeys from "../api/keys";

type Key = (typeof teamKeys)["all"];

export interface useGetTeamsQueryProps
    extends ExtraQueryOptionsI<ListTeamReturnI, Key> {}
export default function useListTeamsQuery({
    ...options
}: useGetTeamsQueryProps = {}) {
    return useSuspenseQuery({
        ...queryAllTeamsQueryOptions(),
        ...options,
    });
}
