import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import { WeeklyDeathsArk, type WeeklyDeathsT } from "../types";
import weeklyStatsKeys from "./keys";

const WeeklyDeathsArrayArk = WeeklyDeathsArk.array();

async function fetchWeeklyDeaths(): Promise<WeeklyDeathsT[]> {
    const url = `${getBaseURL()}/api/stats/weekly/deaths`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch WeeklyDeaths data");
    }
    const { data } = await response.json();
    const parsed = WeeklyDeathsArrayArk(data);
    if (parsed instanceof type.errors) {
        throw new Error("Invalid WeeklyDeaths data parsed");
    }
    return parsed;
}

export const getWeeklyDeathsQueryOptions = () =>
    queryOptions({
        queryKey: weeklyStatsKeys.deaths,
        queryFn: fetchWeeklyDeaths,
    });
