import { useQuery } from "@tanstack/react-query";
import { queryChampionPresenceQueryOptions } from "../api/get-champion-presence";

import type { ExtraQueryOptionsI } from "@/types";
import type championPresenceKeys from "../api/keys";
import type { ChampionAppearanceT, ChampionPresenceT } from "../types";

type Key = (typeof championPresenceKeys)["all"];

export interface useChampionPresenceQueryProps
    extends ExtraQueryOptionsI<
        ChampionAppearanceT[],
        Key,
        ChampionPresenceT[]
    > {}
export default function useChampionPresenceQuery({
    ...options
}: useChampionPresenceQueryProps = {}) {
    return useQuery({
        ...queryChampionPresenceQueryOptions(),
        ...options,
    });
}
