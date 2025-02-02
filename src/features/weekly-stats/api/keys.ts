const weeklyStatsKeys = {
    all: ["weekly-stats"] as const,
    kills: ["weekly-stats", "kills"] as const,
    deaths: ["weekly-stats", "deaths"] as const,
    assists: ["weekly-stats", "assists"] as const,
};

export default weeklyStatsKeys;
export type KeyT = typeof weeklyStatsKeys;
