import type { TeamGameDataT, TeamStatQueryT } from "../types";

/**
 * Condense the match record of a team into a single object of stats
 * @param teamRecord Database select query for a team
 */
export function calculateTeamStats(teamRecord: TeamStatQueryT): TeamGameDataT {
    const blueGamesPlayed = teamRecord.matchesForTeamARel.length;
    const redGamesPlayed = teamRecord.matchesForTeamBRel.length;
    const blueWins = teamRecord.matchesForTeamARel.reduce(
        (acc, match) => (match.blueWon ? acc + 1 : acc),
        0,
    );
    const redWins = teamRecord.matchesForTeamBRel.reduce(
        (acc, match) => (match.blueWon ? acc : acc + 1),
        0,
    );
    const totalGametime =
        teamRecord.matchesForTeamARel.reduce(
            (acc, match) => acc + match.gameTimeSeconds,
            0,
        ) +
        teamRecord.matchesForTeamBRel.reduce(
            (acc, match) => acc + match.gameTimeSeconds,
            0,
        );
    return {
        id: teamRecord.id,
        defaultName: teamRecord.defaultName,
        teamName: teamRecord.teamName,
        matchStats: {
            averageGameTime:
                blueGamesPlayed + redGamesPlayed > 0
                    ? totalGametime / (blueGamesPlayed + redGamesPlayed)
                    : 0,
            blueWins,
            blueGamesPlayed,
            redWins,
            redGamesPlayed,
        },
    };
}
