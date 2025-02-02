import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import { WeeklyKillsArk, type WeeklyKillsT } from "../types";
import weeklyStatsKeys from "./keys";

const WeeklyKillsArrayArk = WeeklyKillsArk.array();

async function fetchWeeklyKills(): Promise<WeeklyKillsT[]> {
    const url = `${getBaseURL()}/api/stats/weekly/kills`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch WeeklyKills data");
    }
    const { data } = await response.json();
    const parsed = WeeklyKillsArrayArk(data);
    if (parsed instanceof type.errors) {
        throw new Error("Invalid WeeklyKills data parsed");
    }
    return parsed;
}

export const getWeeklyKillsQueryOptions = () =>
    queryOptions({
        queryKey: weeklyStatsKeys.kills,
        queryFn: fetchWeeklyKills,
    });
