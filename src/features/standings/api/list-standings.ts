import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import { TeamStandingsArk, type TeamStandingsT } from "../types";
import standingsKeys from "./keys";

const arrayArk = TeamStandingsArk.array();
async function fetchTeamStandings(): Promise<TeamStandingsT[]> {
    const url = `${getBaseURL()}/api/stats/standings`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch Standings data");
    }
    const { data } = await response.json();
    const parsed = arrayArk(data);
    if (parsed instanceof type.errors) {
        throw new Error("Invalid Standings data");
    }
    return parsed;
}

export const listStandingsQueryOptions = () =>
    queryOptions({
        queryKey: standingsKeys.all,
        queryFn: fetchTeamStandings,
    });
