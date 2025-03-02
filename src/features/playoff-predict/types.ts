import { type } from "arktype";

export type { PlayoffMatchT } from "@/lib/crud/playoff-matches";

export const PlayoffTeamArk = type({
    id: "number",
    name: "string > 0",
    playoffRank: "number > 0",
});
export type PlayoffTeamT = typeof PlayoffTeamArk.infer;

export const MatchTeamArk = type({ id: "number", name: "string > 0" });
export type MatchTeamT = typeof MatchTeamArk.infer;
export interface Match {
    id: number;
    teams: [MatchTeamT | null, MatchTeamT | null];
    winner: 0 | 1 | null; // 0 for blue, 1 for red
    locked: boolean;
}

// validator for PlayoffMatchT from crud
export const PlayoffMatchArk = type({
    blueTeam: "number.integer",
    redTeam: "number.integer",
    blueWon: "boolean",
    playDate: type("string.date").pipe((s) => new Date(s)),
});

export const SubmissionMatchArk = type({
    id: "number",
    teams: MatchTeamArk.array().exactlyLength(2),
    winner: "0 | 1 | null",
    // delete extra keys
    "+": "delete",
});
export const PredictionFormArk = type({
    matches: SubmissionMatchArk.array().exactlyLength(7),
    email: "string.email",
});
export type PredictionFormT = typeof PredictionFormArk.infer;
export const AggregatedPredictionsArk = type({
    matchId: "number",
    blueWinOdds: "0 <= number <= 1",
    redWinOdds: "0 <= number <= 1",
});
export type AggregatedPredictionsT = typeof AggregatedPredictionsArk.infer;
