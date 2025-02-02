import { getTotalKillsByWeek } from "@/lib/crud/weekly-groupings";
import db from "@/lib/drizzle-db";
import { queryOptions } from "@tanstack/react-query";
import weeklyStatsKeys from "./keys";

import type { WeeklyKillsT } from "../types";

async function prefetchWeeklyKills(): Promise<WeeklyKillsT[]> {
    return getTotalKillsByWeek(db);
}
export const getWeeklyKillsPrefetchQueryOptions = () =>
    queryOptions({
        queryKey: weeklyStatsKeys.kills,
        queryFn: prefetchWeeklyKills,
    });
