import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import { PlayedMatchDetailsArk, type PlayedMatchDetailsT } from "../types";
import scheduleKeys from "./keys";

export async function getMatchData(
    id: string | number,
): Promise<PlayedMatchDetailsT> {
    const url = `${getBaseURL()}/api/schedule/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed request for match ${id}`);
    }
    const { data } = await response.json();
    const parsed = PlayedMatchDetailsArk(data);
    if (parsed instanceof type.errors) {
        throw new Error(`Received invalid PlayedMatch data for id=${id}`);
    }
    return parsed;
}

export const getPlayedMatchQueryOptions = (id: string | number) =>
    queryOptions({
        queryKey: scheduleKeys.detail(id),
        queryFn: async () => await getMatchData(id),
        staleTime: 1000 * 60 * 60, // 1 hour
        refetchInterval: 1000 * 60 * 90, // 1 hour half
    });
