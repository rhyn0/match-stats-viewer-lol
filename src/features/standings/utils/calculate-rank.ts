import type { RankedTeamStandingsT, TeamStandingsT } from "../types";

export default function calculateRanks(
    data: TeamStandingsT[],
): RankedTeamStandingsT[] {
    return data
        .sort(sortTeams)
        .map((team, idx) => ({ ...team, rank: idx + 1 }));
}

/**
 * Returns in descending rank order. Higher wins earlier.
 *
 * @param a First team to compare with
 * @param b Second team to compare with
 * @returns Number to modify order
 */
export function sortTeams(a: TeamStandingsT, b: TeamStandingsT): number {
    if (a.win !== b.win) {
        return a.win > b.win ? -1 : 1;
    }
    // if wins are equal, we look at head to head.
    // If there is a head to head, whoever won that goes earlier
    if (a.beat.includes(b.teamId)) {
        // a beat b, so a comes earlier
        return -1;
    }
    if (b.beat.includes(a.teamId)) {
        // b beat a, so b comes earlier
        return 1;
    }
    // for all intents and purposes, these teams are TIED for now
    // which can cause some hydration issues
    // so here we sort by team name
    return a.teamDefaultName.localeCompare(b.teamDefaultName);
}
