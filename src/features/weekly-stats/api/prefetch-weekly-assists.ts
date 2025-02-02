import { getTotalAssistsByWeek } from "@/lib/crud/weekly-groupings";
import db from "@/lib/drizzle-db";
import { queryOptions } from "@tanstack/react-query";
import weeklyStatsKeys from "./keys";

import type { WeeklyAssistsT } from "../types";

async function prefetchWeeklyAssists(): Promise<WeeklyAssistsT[]> {
    return getTotalAssistsByWeek(db);
}
export const getWeeklyAssistsPrefetchQueryOptions = () =>
    queryOptions({
        queryKey: weeklyStatsKeys.assists,
        queryFn: prefetchWeeklyAssists,
    });
