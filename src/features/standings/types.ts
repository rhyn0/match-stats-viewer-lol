import { type } from "arktype";

export const TeamStandingsArk = type({
    teamId: "number",
    teamDefaultName: "string",
    teamName: "string | null",
    win: "number >= 0",
    loss: "number >= 0",
    totalGames: "number >= 0",
    beat: "number[]",
});
export type TeamStandingsT = typeof TeamStandingsArk.infer;

export type RankedTeamStandingsT = TeamStandingsT & { rank: number };
