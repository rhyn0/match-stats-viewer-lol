import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import { PositionDeathsArk, type PositionDeathsT } from "../types";
import positionStatsKeys from "./keys";

const ArrayValidator = PositionDeathsArk.array();

async function fetchPositionDeaths(): Promise<PositionDeathsT[]> {
    const url = `${getBaseURL()}/api/stats/position/deaths`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch PositionDeaths data");
    }
    const { data } = await response.json();
    const parsed = ArrayValidator(data);
    if (parsed instanceof type.errors) {
        throw new Error("Invalid PositionDeaths data parsed");
    }
    return parsed;
}

export const getPositionDeathsQueryOptions = () =>
    queryOptions({
        queryKey: positionStatsKeys.deaths,
        queryFn: fetchPositionDeaths,
    });
