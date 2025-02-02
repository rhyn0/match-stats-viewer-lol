import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import { WeeklyAssistsArk, type WeeklyAssistsT } from "../types";
import weeklyStatsKeys from "./keys";

const WeeklyAssistsArrayArk = WeeklyAssistsArk.array();

async function fetchWeeklyAssists(): Promise<WeeklyAssistsT[]> {
    const url = `${getBaseURL()}/api/stats/weekly/assists`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch WeeklyAssists data");
    }
    const { data } = await response.json();
    const parsed = WeeklyAssistsArrayArk(data);
    if (parsed instanceof type.errors) {
        throw new Error("Invalid WeeklyAssists data parsed");
    }
    return parsed;
}

export const getWeeklyAssistsQueryOptions = () =>
    queryOptions({
        queryKey: weeklyStatsKeys.assists,
        queryFn: fetchWeeklyAssists,
    });
