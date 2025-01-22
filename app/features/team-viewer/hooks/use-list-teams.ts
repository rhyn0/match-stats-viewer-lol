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
export default function useBerryFirmnessQuery({
    ...options
}: useGetTeamsQueryProps = {}) {
    // @ts-expect-error - this is an error with drizzle not giving types for selecting with relationships
    return useSuspenseQuery({
        ...queryAllTeamsQueryOptions(),
        ...options,
    });
}
