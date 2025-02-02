import type { PlayerPositionT } from "@/types/league";
import { type } from "arktype";

export const PositionKillsArk = type({
    position: "'top' | 'jgl' | 'mid' | 'bot' | 'sup'",
    totalKills: "number >= 0",
});
export type PositionKillsT = typeof PositionKillsArk.infer;

export const PositionDeathsArk = type({
    position: "'top' | 'jgl' | 'mid' | 'bot' | 'sup'",
    totalDeaths: "number >= 0",
});
export type PositionDeathsT = typeof PositionDeathsArk.infer;

export const PositionAssistsArk = type({
    position: "'top' | 'jgl' | 'mid' | 'bot' | 'sup'",
    totalAssists: "number >= 0",
});
export type PositionAssistsT = typeof PositionAssistsArk.infer;

export type BasePositionDataT = { position: PlayerPositionT };
