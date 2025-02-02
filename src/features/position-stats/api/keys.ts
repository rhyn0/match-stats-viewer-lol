import type { PlayerPositionT } from "@/types/league";

const positionStatsKeys = {
    all: ["position-stats"] as const,
    kills: ["position-stats", "kills"] as const,
    deaths: ["position-stats", "deaths"] as const,
    assists: ["position-stats", "assists"] as const,
    positionKills: (position: PlayerPositionT) => [
        ...positionStatsKeys.kills,
        position,
    ],
    positionDeaths: (position: PlayerPositionT) => [
        ...positionStatsKeys.deaths,
        position,
    ],
    positionAssists: (position: PlayerPositionT) => [
        ...positionStatsKeys.assists,
        position,
    ],
};

export default positionStatsKeys;
export type KeyT = typeof positionStatsKeys;
