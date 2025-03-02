import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import {
    AggregatedPredictionsArk,
    type AggregatedPredictionsT,
} from "../types";
import playoffPredictKeys from "./keys";

const arrayArk = AggregatedPredictionsArk.array();

async function fetchPlayoffPredictions(): Promise<AggregatedPredictionsT[]> {
    const url = `${getBaseURL()}/api/playoff/prediction`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed request for playoff predictions info.");
    }
    const { data } = await response.json();
    // assert will either return the validated array or throw Error
    return arrayArk.assert(data);
}

export const getPlayoffPredictionsQueryOptions = () =>
    queryOptions({
        queryKey: playoffPredictKeys.predictions,
        queryFn: fetchPlayoffPredictions,
        staleTime: 3_600_000, // 1 hour in milliseconds
    });
