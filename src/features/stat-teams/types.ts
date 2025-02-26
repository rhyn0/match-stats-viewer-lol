import type { MatchSelectT } from "@/db/schema/match";
import type { TeamSelectT } from "@/db/schema/team";
import { type } from "arktype";

export interface TeamStatRecordI {
    teamName: string | null;
    defaultName: string;
    gamesPlayed: number;
    averageGameTime: number;
    overallWinRate: number;
    blueWinRate: number;
    redWinRate: number;
    averageWinTime: number;
}

export const TeamGameDataArk = type({
    "+": "delete",
    id: "number > 0",
    defaultName: "string > 0",
    teamName: "string | null",
    matchStats: {
        averageGameTime: "number >= 0",
        blueWins: "number.integer >= 0",
        blueGamesPlayed: "number.integer >= 0",
        redWins: "number.integer >= 0",
        redGamesPlayed: "number.integer >= 0",
        averageWinTime: "number >= 0",
    },
});
export type TeamGameDataT = typeof TeamGameDataArk.infer;
export type TeamMatchSelectT = Pick<
    MatchSelectT,
    "blueWon" | "gameTimeSeconds"
>;
export type TeamStatQueryT = Omit<TeamSelectT, "modifiedAt"> & {
    matchesForTeamARel: TeamMatchSelectT[];
    matchesForTeamBRel: TeamMatchSelectT[];
};
