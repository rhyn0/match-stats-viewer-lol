import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { type } from "arktype";
import { TeamGameDataArk } from "../types";
import teamsStatKeys from "./keys";

import type { TeamGameDataT } from "../types";

export async function queryListTeamstats(): Promise<TeamGameDataT[]> {
    const url = `${getBaseURL()}/api/stats/team`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed request for team stats");
    }
    const { data } = await response.json();
    const parsed = TeamGameDataArrayArk(data);
    if (parsed instanceof type.errors) {
        throw new Error("Received invalid TeamStat data");
    }
    return parsed;
}
const TeamGameDataArrayArk = TeamGameDataArk.array();
export const queryListTeamStatsOptions = () =>
    queryOptions({
        queryKey: teamsStatKeys.all,
        queryFn: queryListTeamstats,
    });
