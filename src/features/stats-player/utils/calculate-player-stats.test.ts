import type { OverallPlayerStatQueryT } from "../types";
import { calculatePlayerStats } from "./calculate-player-stats";

describe("calculatePlayerStats", () => {
    it("should calculate total kills, deaths, and assists correctly", () => {
        const playerRecord: OverallPlayerStatQueryT = {
            id: 1,
            summonerName: "Player1",
            playerTeamRel: {
                id: 2,
                teamName: "Team1",
                defaultName: "DefaultTeam",
            },
            playerMatchesRel: [
                {
                    playerKills: 5,
                    position: "top",
                    matchId: 1,
                    playerDeaths: 3,
                    playerAssists: 7,
                    killParticipation: 0.5,
                    playerChampionName: "ChampionA",
                },
                {
                    playerKills: 8,
                    position: "top",
                    matchId: 2,
                    playerDeaths: 2,
                    playerAssists: 10,
                    killParticipation: 0.6,
                    playerChampionName: "ChampionB",
                },
            ],
        };

        const result = calculatePlayerStats(playerRecord);

        expect(result.totalKills).toBe(13);
        expect(result.totalDeaths).toBe(5);
        expect(result.totalAssists).toBe(17);
    });

    it("should calculate kill participation correctly", () => {
        const playerRecord: OverallPlayerStatQueryT = {
            id: 2,
            summonerName: "Player2",
            playerTeamRel: {
                id: 3,
                teamName: "Team2",
                defaultName: "DefaultTeam",
            },
            playerMatchesRel: [
                {
                    playerKills: 3,
                    playerDeaths: 4,
                    position: "jgl",
                    matchId: 5,
                    playerAssists: 5,
                    killParticipation: 0.4,
                    playerChampionName: "ChampionA",
                },
                {
                    playerKills: 6,
                    playerDeaths: 1,
                    position: "jgl",
                    matchId: 6,
                    playerAssists: 8,
                    killParticipation: 0.7,
                    playerChampionName: "ChampionA",
                },
            ],
        };

        const result = calculatePlayerStats(playerRecord);

        expect(result.killParticipation.min).toBe(0.4);
        expect(result.killParticipation.max).toBe(0.7);
        expect(result.killParticipation.avg).toBeCloseTo(0.55, 2);
    });

    it("should determine the most played champion correctly", () => {
        const playerRecord: OverallPlayerStatQueryT = {
            id: 3,
            summonerName: "Player3",
            playerTeamRel: {
                id: 4,
                teamName: "Team3",
                defaultName: "DefaultTeam",
            },
            playerMatchesRel: [
                {
                    position: "mid",
                    matchId: 9,
                    playerKills: 2,
                    playerDeaths: 5,
                    playerAssists: 6,
                    killParticipation: 0.3,
                    playerChampionName: "ChampionA",
                },
                {
                    position: "mid",
                    matchId: 10,
                    playerKills: 4,
                    playerDeaths: 2,
                    playerAssists: 7,
                    killParticipation: 0.5,
                    playerChampionName: "ChampionB",
                },
                {
                    position: "mid",
                    matchId: 11,
                    playerKills: 3,
                    playerDeaths: 3,
                    playerAssists: 4,
                    killParticipation: 0.4,
                    playerChampionName: "ChampionA",
                },
            ],
        };

        const result = calculatePlayerStats(playerRecord);

        expect(result.champions.mostPlayed).toBe("ChampionA");
    });

    it("should handle players with no matches", () => {
        const playerRecord: OverallPlayerStatQueryT = {
            id: 4,
            summonerName: "Player4",
            playerTeamRel: {
                id: 5,
                teamName: "Team4",
                defaultName: "DefaultTeam",
            },
            playerMatchesRel: [],
        };

        const result = calculatePlayerStats(playerRecord);

        expect(result.totalKills).toBe(0);
        expect(result.totalDeaths).toBe(0);
        expect(result.totalAssists).toBe(0);
        expect(result.gamesPlayed).toBe(0);
        expect(result.champions.mostPlayed).toBeNull();
    });
});
