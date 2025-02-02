import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeeklyDeathsQueryOptions } from "../api/get-weekly-deaths";

import type { ExtraQueryOptionsI } from "@/types";
import type weeklyStatsKeys from "../api/keys";
import type { WeeklyDeathsT } from "../types";

type Key = (typeof weeklyStatsKeys)["deaths"];

export interface useWeeklyDeathsQueryProps
    extends ExtraQueryOptionsI<WeeklyDeathsT[], Key> {}
export default function useWeeklyDeathStatsQuery({
    ...options
}: useWeeklyDeathsQueryProps = {}) {
    return useSuspenseQuery({
        ...getWeeklyDeathsQueryOptions(),
        ...options,
    });
}
