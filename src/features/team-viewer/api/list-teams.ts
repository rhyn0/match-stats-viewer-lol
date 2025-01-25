import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import { TeamArk } from "../types";
import teamsKeys from "./keys";

const TeamPlayerArrayArk = TeamArk.array();

export type ListTeamReturnI = typeof TeamPlayerArrayArk.infer;
export async function queryAllTeams(): Promise<ListTeamReturnI> {
    const url = `${getBaseURL()}/api/team`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed request for team stats");
    }
    const { data } = await response.json();
    const parsed = TeamPlayerArrayArk(data);
    if (parsed instanceof type.errors) {
        throw new Error("Received invalid TeamStat data");
    }
    return parsed;
}

export const queryAllTeamsQueryOptions = () =>
    queryOptions({
        queryKey: teamsKeys.all,
        queryFn: async () => await queryAllTeams(),
    });
