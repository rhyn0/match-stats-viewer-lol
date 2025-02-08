import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import { ChampionPresenceArk } from "../types";
import championPresenceKeys from "./keys";

import type { ChampionPresenceT } from "../types";

const presenceArrayArk = ChampionPresenceArk.array();

export async function getChampionPresence(): Promise<ChampionPresenceT[]> {
    const url = `${getBaseURL()}/api/stats/champion/presence`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed request for champion presence");
    }
    const { data } = await response.json();
    const parsed = presenceArrayArk(data);
    if (parsed instanceof type.errors) {
        throw new Error("Received invalid ChampionPresence data");
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
    });
