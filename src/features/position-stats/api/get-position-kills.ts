import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import { PositionKillsArk, type PositionKillsT } from "../types";
import positionStatsKeys from "./keys";

const ArrayValidator = PositionKillsArk.array();

async function fetchPositionKills(): Promise<PositionKillsT[]> {
    const url = `${getBaseURL()}/api/stats/position/kills`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch PositionKills data");
    }
    const { data } = await response.json();
    const parsed = ArrayValidator(data);
    if (parsed instanceof type.errors) {
        throw new Error("Invalid PositionKills data parsed");
    }
    return parsed;
}

export const getPositionKillsQueryOptions = () =>
    queryOptions({
        queryKey: positionStatsKeys.kills,
        queryFn: fetchPositionKills,
    });
