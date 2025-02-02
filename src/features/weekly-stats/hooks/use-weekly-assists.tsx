import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeeklyAssistsQueryOptions } from "../api/get-weekly-assists";

import type { ExtraQueryOptionsI } from "@/types";
import type weeklyStatsKeys from "../api/keys";
import type { WeeklyAssistsT } from "../types";

type Key = (typeof weeklyStatsKeys)["assists"];

export interface useWeeklyAssistsQueryProps
    extends ExtraQueryOptionsI<WeeklyAssistsT[], Key> {}
export default function useWeeklyAssistStatsQuery({
    ...options
}: useWeeklyAssistsQueryProps = {}) {
    return useSuspenseQuery({
        ...getWeeklyAssistsQueryOptions(),
        ...options,
    });
}
