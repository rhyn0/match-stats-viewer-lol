import type { TeamGameDataT, TeamStatQueryT } from "../types";

/**
 * Condense the match record of a team into a single object of stats
 * @param teamRecord Database select query for a team
 */
export function calculateTeamStats(teamRecord: TeamStatQueryT): TeamGameDataT {
    const blueMatches = teamRecord.matchesForTeamARel.filter(
        (match) => match.blueWon !== null,
    );
    const blueGamesPlayed = blueMatches.length;
    const redMatches = teamRecord.matchesForTeamBRel.filter(
        (match) => match.blueWon !== null,
    );
    const redGamesPlayed = redMatches.length;
    const blueWins = blueMatches.reduce(
        (acc, match) => (match.blueWon ? acc + 1 : acc),
        0,
    );
    const redWins = redMatches.reduce(
        (acc, match) => (match.blueWon ? acc : acc + 1),
        0,
    );
    const totalGametime =
        teamRecord.matchesForTeamARel.reduce(
            (acc, match) => acc + (match.gameTimeSeconds ?? 0),
            0,
        ) +
        teamRecord.matchesForTeamBRel.reduce(
            (acc, match) => acc + (match.gameTimeSeconds ?? 0),
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
