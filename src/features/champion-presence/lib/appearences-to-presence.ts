import type { ChampionAppearanceT, ChampionPresenceT } from "../types";

export function appearanceToPresence(
    data: ChampionAppearanceT[],
): ChampionPresenceT[] {
    const numMatches = data.length;
    const championToPresenceMap = data.reduce<Map<string, ChampionPresenceT>>(
        (acc, match) => {
            for (const pick of match.picks) {
                if (!acc.has(pick)) {
                    acc.set(pick, {
                        champion: pick,
                        picks: 0,
                        bans: 0,
                        totalGames: numMatches,
                    });
                }
                // @ts-expect-error - line above guarantees it
                acc.get(pick).picks += 1;
            }
            for (const ban of match.blueBans) {
                if (!acc.has(ban)) {
                    acc.set(ban, {
                        champion: ban,
                        picks: 0,
                        bans: 0,
                        totalGames: numMatches,
                    });
                }
                // @ts-expect-error - line above guarantees it
                acc.get(ban).bans += 1;
            }
            for (const ban of match.redBans) {
                if (!acc.has(ban)) {
                    acc.set(ban, {
                        champion: ban,
                        picks: 0,
                        bans: 0,
                        totalGames: numMatches,
                    });
                }
                // @ts-expect-error - line above guarantees it
                acc.get(ban).bans += 1;
            }
            return acc;
        },
        new Map(),
    );
    return Array.from(championToPresenceMap.entries()).map(
        ([_k, presence]) => presence,
    );
}
