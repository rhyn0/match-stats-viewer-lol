import divideDefault from "@/lib/divide-by-zero";
import type { TeamGameDataT, TeamMatchSelectT, TeamStatQueryT } from "../types";

function getWinsTime(
    matches: TeamMatchSelectT[],
    isBlue: boolean,
): { wins: number; gameSeconds: number } {
    return matches.reduce(
        (acc, match) => {
            if (
                (match.blueWon && isBlue) ||
                (match.blueWon === false && !isBlue)
            ) {
                // @ts-expect-error - won't be null if blueWon is set
                acc.gameSeconds += match.gameTimeSeconds;
                acc.wins += 1;
            }
            return acc;
        },
        { wins: 0, gameSeconds: 0 },
    );
}

/**
 * Condense the match record of a team into a single object of stats
 * @param teamRecord Database select query for a team
 */
export function calculateTeamStats(teamRecord: TeamStatQueryT): TeamGameDataT {
    const blueMatches = teamRecord.matchesForTeamARel.filter(
        (match) => match.blueWon !== null && (match.gameTimeSeconds ?? 0) > 0,
    );
    const blueGamesPlayed = blueMatches.length;
    const redMatches = teamRecord.matchesForTeamBRel.filter(
        (match) => match.blueWon !== null && (match.gameTimeSeconds ?? 0) > 0,
    );
    const redGamesPlayed = redMatches.length;
    const { wins: blueWins, gameSeconds: blueWinTime } = getWinsTime(
        blueMatches,
        true,
    );
    const { wins: redWins, gameSeconds: redWinTime } = getWinsTime(
        redMatches,
        false,
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
            averageGameTime: divideDefault(
                totalGametime,
                blueGamesPlayed + redGamesPlayed,
                0,
            ),
            blueWins,
            blueGamesPlayed,
            redWins,
            redGamesPlayed,
            averageWinTime: divideDefault(
                blueWinTime + redWinTime,
                blueWins + redWins,
                0,
            ),
        },
    };
}
