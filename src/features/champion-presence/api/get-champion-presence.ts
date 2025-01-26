import { getBaseURL } from "@/lib/get-base-url";
import { ChampionAppearanceArk } from "../types";
import championPresenceKeys from "./keys";

import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import { appearanceToPresence } from "../lib/appearences-to-presence";
import type { ChampionAppearanceT } from "../types";

export async function getChampionPresence(): Promise<ChampionAppearanceT[]> {
    const url = `${getBaseURL()}/api/stats/champion/presence`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed request for champion presence");
    }
    const { data } = await response.json();
    const parsed = ChampionAppearanceArk.array()(data);
    if (parsed instanceof type.errors) {
        throw new Error("Received invalid TeamStat data");
    }
    return parsed;
}

export interface ChampionPresenceReturnI {
    id: number;
}

export const queryChampionPresenceQueryOptions = () =>
    queryOptions({
        queryKey: championPresenceKeys.all,
        queryFn: getChampionPresence,
        select: appearanceToPresence,
    });
