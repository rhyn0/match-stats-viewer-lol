import { calculateTeamStats } from "@/features/stat-teams/utils/team-matches-to-stats";

describe("calculateTeamStats", () => {
    it("should calculate the stats for a team", () => {
        const teamRecord = {
            id: 1,
            defaultName: "Team 1",
            teamName: "Team 1",
            modifiedAt: new Date(),
            matchesForTeamARel: [
                { blueWon: true, gameTimeSeconds: 3000 },
                { blueWon: false, gameTimeSeconds: 2700 },
            ],
            matchesForTeamBRel: [
                { blueWon: false, gameTimeSeconds: 2400 },
                { blueWon: true, gameTimeSeconds: 3300 },
            ],
        };

        const stats = calculateTeamStats(teamRecord);

        expect(stats).toEqual({
            id: 1,
            defaultName: "Team 1",
            teamName: "Team 1",
            matchStats: {
                averageGameTime: 2850, // average of 3000, 2700, 2400, 3300
                blueWins: 1, // times blueWon is true, inside matchesForTeamARel
                blueGamesPlayed: 2,
                redWins: 1, // times blueWon is false, inside matchesForTeamBRel
                redGamesPlayed: 2,
            },
        });
    });
    it("should return 0 stats for teams that have played no matches", () => {
        const teamRecord = {
            id: 1,
            defaultName: "Team 1",
            teamName: "Team 1",
            modifiedAt: new Date(),
            matchesForTeamARel: [],
            matchesForTeamBRel: [],
        };

        const stats = calculateTeamStats(teamRecord);

        expect(stats).toEqual({
            id: 1,
            defaultName: "Team 1",
            teamName: "Team 1",
            matchStats: {
                averageGameTime: 0,
                blueWins: 0,
                blueGamesPlayed: 0,
                redWins: 0,
                redGamesPlayed: 0,
            },
        });
    });
});
