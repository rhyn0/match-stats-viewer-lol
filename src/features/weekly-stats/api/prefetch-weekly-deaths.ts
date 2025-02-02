import { getTotalDeathsByWeek } from "@/lib/crud/weekly-groupings";
import db from "@/lib/drizzle-db";
import { queryOptions } from "@tanstack/react-query";
import weeklyStatsKeys from "./keys";

import type { WeeklyDeathsT } from "../types";

async function prefetchWeeklyDeaths(): Promise<WeeklyDeathsT[]> {
    return getTotalDeathsByWeek(db);
}
export const getWeeklyDeathsPrefetchQueryOptions = () =>
    queryOptions({
        queryKey: weeklyStatsKeys.deaths,
        queryFn: prefetchWeeklyDeaths,
    });
