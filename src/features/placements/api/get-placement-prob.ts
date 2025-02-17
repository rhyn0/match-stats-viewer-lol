import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import { PlacementProbArk, type PlacementProbT } from "../types";
import placementProbKeys from "./keys";

const placementArrayArk = PlacementProbArk.array();

async function fetchPlacementForTeam(
    teamId: number,
): Promise<PlacementProbT[]> {
    const url = `${getBaseURL()}/api/team/${teamId}/placement`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed request for team placement probs ${teamId}`);
    }
    const { data } = await response.json();
    const parsed = placementArrayArk(data);
    if (parsed instanceof type.errors) {
        throw new Error("Received invalid PlacementProbability data");
    }
    return parsed;
}

export const getTeamPlacementProbQueryOptions = (teamId: number) =>
    queryOptions({
        queryKey: placementProbKeys.detail(teamId),
        queryFn: () => fetchPlacementForTeam(teamId),
    });
