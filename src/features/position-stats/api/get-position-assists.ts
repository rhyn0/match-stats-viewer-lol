import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import { PositionAssistsArk, type PositionAssistsT } from "../types";
import positionStatsKeys from "./keys";

const ArrayValidator = PositionAssistsArk.array();

async function fetchPositionAssists(): Promise<PositionAssistsT[]> {
    const url = `${getBaseURL()}/api/stats/position/assists`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch PositionAssists data");
    }
    const { data } = await response.json();
    const parsed = ArrayValidator(data);
    if (parsed instanceof type.errors) {
        throw new Error("Invalid PositionAssists data parsed");
    }
    return parsed;
}

export const getPositionAssistsQueryOptions = () =>
    queryOptions({
        queryKey: positionStatsKeys.assists,
        queryFn: fetchPositionAssists,
    });
