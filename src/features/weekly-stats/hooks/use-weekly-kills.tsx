import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeeklyKillsQueryOptions } from "../api/get-weekly-kills";

import type { ExtraQueryOptionsI } from "@/types";
import type weeklyStatsKeys from "../api/keys";
import type { WeeklyKillsT } from "../types";

type Key = (typeof weeklyStatsKeys)["kills"];

export interface useWeeklyKillsQueryProps
    extends ExtraQueryOptionsI<WeeklyKillsT[], Key> {}
export default function useWeeklyKillStatsQuery({
    ...options
}: useWeeklyKillsQueryProps = {}) {
    return useSuspenseQuery({
        ...getWeeklyKillsQueryOptions(),
        ...options,
    });
}
