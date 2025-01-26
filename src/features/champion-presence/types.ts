import type { GetChampionPresenceOutputT } from "@/lib/crud/champ-presence";
import { type } from "arktype";

type Champion = string;

export type ChampionAppearanceT = Omit<
    GetChampionPresenceOutputT,
    "picks" | "blueBans" | "redBans"
> & {
    picks: Champion[];
    blueBans: Champion[];
    redBans: Champion[];
};

export const ChampionAppearanceArk = type({
    id: "number",
    picks: "string[] > 0",
    blueBans: "string[]",
    redBans: "string[]",
});

export type ChampionPresenceT = {
    champion: string;
    picks: number;
    bans: number;
    totalGames: number;
};
