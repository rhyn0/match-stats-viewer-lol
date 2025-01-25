import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import { TeamArk } from "../types";
import teamsKeys from "./keys";

export type GetTeamReturnI = typeof TeamArk.infer;
export async function queryTeamById(teamId: number): Promise<GetTeamReturnI> {
    const url = `${getBaseURL()}/api/team/${teamId}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed request for team stats");
    }
    const { data } = await response.json();
    const parsed = TeamArk(data);
    if (parsed instanceof type.errors) {
        throw new Error("Received invalid TeamStat data");
    }
    return parsed;
}

export const queryTeamByIdQueryOptions = (teamId: number) =>
    queryOptions({
        queryKey: teamsKeys.detail(teamId),
        queryFn: async () => await queryTeamById(teamId),
    });
