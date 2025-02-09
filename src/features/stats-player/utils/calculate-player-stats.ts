import type {
    OverallPlayerStatQueryT,
    OverallPlayerStatRecordT,
} from "../types";

/**
 * Condense the match record of a player into a single object of stats
 * @param playerRecord Database select query for a player of their matches
 */
export function calculatePlayerStats(
    playerRecord: OverallPlayerStatQueryT,
): OverallPlayerStatRecordT {
    const { totalKills, totalDeaths, totalAssists, killParticipation } =
        playerRecord.playerMatchesRel.reduce(
            (acc, rec, idx) => ({
                totalKills: acc.totalKills + rec.playerKills,
                totalDeaths: acc.totalDeaths + rec.playerDeaths,
                totalAssists: acc.totalAssists + rec.playerAssists,
                killParticipation: {
                    min: Math.min(
                        acc.killParticipation.min,
                        rec.killParticipation,
                    ),
                    max: Math.max(
                        acc.killParticipation.max,
                        rec.killParticipation,
                    ),
                    avg:
                        (acc.killParticipation.avg * idx) / (idx + 1) +
                        rec.killParticipation / (idx + 1),
                },
            }),
            {
                totalKills: 0,
                totalDeaths: 0,
                totalAssists: 0,
                killParticipation: {
                    min: Number.POSITIVE_INFINITY,
                    max: Number.NEGATIVE_INFINITY,
                    avg: 0,
                },
            },
        );
    // count occurrence of each champion from that players match, return highest count
    const championPlays = playerRecord.playerMatchesRel.reduce<
        Map<string, number>
    >((acc, rec) => {
        if (!acc.has(rec.playerChampionName)) {
            acc.set(rec.playerChampionName, 0);
        }
        // @ts-expect-error - i cover the not set case above
        acc.set(rec.playerChampionName, acc.get(rec.playerChampionName) + 1);
        return acc;
    }, new Map());
    return {
        id: playerRecord.id,
        summonerName: playerRecord.summonerName,
        teamName:
            playerRecord.playerTeamRel?.teamName ??
            playerRecord.playerTeamRel?.defaultName ??
            "Sub",
        totalKills,
        totalDeaths,
        totalAssists,
        killParticipation,
        gamesPlayed: playerRecord.playerMatchesRel.length,
        champions: {
            mostPlayed: getHighestValueKey(championPlays),
            numberUnique: championPlays.size,
        },
    };
}

function getHighestValueKey<K, V extends number>(map: Map<K, V>): K | null {
    let maxKey: K | null = null;
    let maxValue = Number.NEGATIVE_INFINITY;

    for (const [key, value] of map.entries()) {
        if (value > maxValue) {
            maxValue = value;
            maxKey = key;
        }
    }

    return maxKey;
}
