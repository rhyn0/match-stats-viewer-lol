import type { Match, MatchTeamT, PlayoffMatchT, PlayoffTeamT } from "../types";

function buildMatchTeam(team: PlayoffTeamT): MatchTeamT {
    return { id: team.id, name: team.name };
}

/**
 * Update matches and return new array with the update.
 *
 * @param matchId Match Id in the bracket( 1- 7 ) for this
 * @param winnerIndex 0 for blue win, 1 for red win
 */
export function handleMatchWinner(
    matches: Match[],
    matchId: number,
    winnerIndex: 0 | 1,
): Match[] {
    const updatedBracket = [...matches];
    const currentMatch = updatedBracket.find((match) => match.id === matchId);
    if (currentMatch) {
        currentMatch.winner = winnerIndex;

        // Update next match
        // if its finals, do nothing
        // if its semifinals, update finals
        // if quarterfinals upper, update 5
        // else update 6
        const nextMatchId =
            matchId === 7 ? null : matchId >= 5 ? 7 : matchId <= 2 ? 5 : 6;
        if (nextMatchId === null) {
            return updatedBracket;
        }
        const nextMatch = updatedBracket.find(
            (match) => match.id === nextMatchId,
        );
        if (nextMatch) {
            const nextMatchTeamIndex = matchId % 2 === 1 ? 0 : 1;
            nextMatch.teams[nextMatchTeamIndex] =
                currentMatch.teams[winnerIndex];
        }
    }
    return updatedBracket;
}

export function buildBracket(
    teams: PlayoffTeamT[],
    playedMatches: PlayoffMatchT[],
): Match[] {
    const sorted = teams.sort((a, b) => a.playoffRank - b.playoffRank);
    let base: Match[] = [
        {
            id: 1,
            teams: [buildMatchTeam(sorted[0]), buildMatchTeam(sorted[7])],
            winner: null,
            locked: false,
        },
        {
            id: 2,
            teams: [buildMatchTeam(sorted[3]), buildMatchTeam(sorted[4])],
            winner: null,
            locked: false,
        },
        {
            id: 3,
            teams: [buildMatchTeam(sorted[1]), buildMatchTeam(sorted[6])],
            winner: null,
            locked: false,
        },
        {
            id: 4,
            teams: [buildMatchTeam(sorted[2]), buildMatchTeam(sorted[5])],
            winner: null,
            locked: false,
        },
        { id: 5, teams: [null, null], winner: null, locked: false },
        { id: 6, teams: [null, null], winner: null, locked: false },
        { id: 7, teams: [null, null], winner: null, locked: false },
    ];
    for (const played of playedMatches) {
        const updateMatch = base.find((matchup) => {
            const teamIds = matchup.teams.map((t) => t?.id);
            return (
                teamIds?.includes(played.blueTeam) &&
                teamIds?.includes(played.redTeam)
            );
        });
        if (!updateMatch) continue;
        updateMatch.winner = played.blueWon ? 0 : 1;
        updateMatch.locked = true;
        base = handleMatchWinner(base, updateMatch.id, updateMatch.winner);
    }
    return base;
}
