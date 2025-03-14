import type { allChampions } from "@/features/upload-form/constants";
import { championValidatorArk } from "@/types/league";
import { type } from "arktype";

export type Champion = (typeof allChampions)[number];

export type ChampionPresenceT = {
    champName: Champion;
    wins: number;
    losses: number;
    timesBanned: number;
    totalMatches: number;
};
export const ChampionPresenceArk = type({
    champName: championValidatorArk,
    wins: "number.integer >= 0",
    losses: "number.integer >= 0",
    timesBanned: "number.integer >= 0",
    totalMatches: "number.integer >= 0",
});
