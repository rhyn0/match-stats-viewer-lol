import { type } from "arktype";

export const WeeklyKillsArk = type({
    gameWeek: "number",
    totalKills: "number",
});
export type WeeklyKillsT = typeof WeeklyKillsArk.infer;

export const WeeklyAssistsArk = type({
    gameWeek: "number",
    totalAssists: "number",
});
export type WeeklyAssistsT = typeof WeeklyAssistsArk.infer;

export const WeeklyDeathsArk = type({
    gameWeek: "number",
    totalDeaths: "number",
});
export type WeeklyDeathsT = typeof WeeklyDeathsArk.infer;

export type BaseWeeklyDataT = { gameWeek: number };
