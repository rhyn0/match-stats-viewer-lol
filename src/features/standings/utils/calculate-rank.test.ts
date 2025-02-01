import { sortTeams } from "@/features/standings/utils/calculate-rank";
import type { TeamStandingsT } from "../types";

describe("sortTeams", () => {
    const higherWins: TeamStandingsT = {
        teamId: 1,
        teamDefaultName: "a",
        teamName: null,
        win: 10,
        loss: 10,
        totalGames: 20,
        // im too lazy to populate this for a simple example
        beat: [],
    };
    const lowerWins: TeamStandingsT = {
        teamId: 2,
        teamDefaultName: "b",
        teamName: null,
        win: 1,
        loss: 10,
        totalGames: 1,
        // im too lazy to populate this for a simple example
        beat: [],
    };
    const duplLowerWins: TeamStandingsT = {
        teamId: 3,
        teamDefaultName: "c",
        teamName: null,
        win: 1,
        loss: 10,
        totalGames: 1,
        // im too lazy to populate this for a simple example
        beat: [],
    };
    const duplHigherWinsButBeat: TeamStandingsT = {
        teamId: 4,
        teamDefaultName: "d",
        teamName: null,
        win: 10,
        loss: 10,
        totalGames: 20,
        beat: [1],
    };
    it("should return that a team with higher wins is earlier", () => {
        expect(sortTeams(higherWins, lowerWins)).toBe(-1);
    });
    it("should return that a team with lesser wins is later", () => {
        expect(sortTeams(lowerWins, higherWins)).toBe(1);
    });
    it("should return that a team with same wins is equal", () => {
        expect(sortTeams(lowerWins, duplLowerWins)).toBe(0);
    });
    it("should return that a team that beat another is earlier", () => {
        expect(sortTeams(duplHigherWinsButBeat, higherWins)).toBe(-1);
    });
});
