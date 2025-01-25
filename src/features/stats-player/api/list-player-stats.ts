import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import {
    OverallPlayerStatRecordArk,
    type OverallPlayerStatRecordT,
} from "../types";
import playerStatKeys from "./keys";

export async function queryAllPlayerStats(): Promise<
    OverallPlayerStatRecordT[]
> {
    const url = `${getBaseURL()}/api/stats/player`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch PlayerStats data");
    }
    const { data } = await response.json();
    const parsed = OverallPlayerStatRecordArrayArk(data);
    if (parsed instanceof type.errors) {
        throw new Error("Received invalid PlayerStat data");
    }
    return parsed;
}
const OverallPlayerStatRecordArrayArk = OverallPlayerStatRecordArk.array();
export const queryAllPlayerStatsOptions = () =>
    queryOptions({
        queryKey: playerStatKeys.all,
        queryFn: queryAllPlayerStats,
    });
