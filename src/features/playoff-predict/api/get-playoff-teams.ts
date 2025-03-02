import { getBaseURL } from "@/lib/get-base-url";
import { queryOptions } from "@tanstack/react-query";
import { PlayoffTeamArk, type PlayoffTeamT } from "../types";
import playoffPredictKeys from "./keys";

const playoffArrayArk = PlayoffTeamArk.array();

async function fetchPlayoffTeams(): Promise<PlayoffTeamT[]> {
    const url = `${getBaseURL()}/api/team/playoff`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed request for playoff team info.");
    }
    const { data } = await response.json();
    // assert will either return the validated array or throw Error
    return playoffArrayArk.assert(data);
}

export const getPlayoffTeamsQueryOptions = () =>
    queryOptions({
        queryKey: playoffPredictKeys.teams,
        queryFn: fetchPlayoffTeams,
    });
