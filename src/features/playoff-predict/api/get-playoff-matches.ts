import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { PlayoffMatchArk, type PlayoffMatchT } from "../types";
import playoffPredictKeys from "./keys";

const playoffArrayArk = PlayoffMatchArk.array();

async function fetchPlayoffMatches(): Promise<PlayoffMatchT[]> {
    const url = `${getBaseURL()}/api/playoff/played`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed request for playoff matches info.");
    }
    const { data } = await response.json();
    // assert will either return the validated array or throw Error
    return playoffArrayArk.assert(data);
}

export const getPlayoffMatchesQueryOptions = () =>
    queryOptions({
        queryKey: playoffPredictKeys.matches,
        queryFn: fetchPlayoffMatches,
        staleTime: Number.POSITIVE_INFINITY,
    });
