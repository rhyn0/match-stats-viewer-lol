import { getTeamStandings } from "@/lib/crud/standings";
import db from "@/lib/drizzle-db";
import { queryOptions } from "@tanstack/react-query";
import type { TeamStandingsT } from "../types";
import standingsKeys from "./keys";

async function prefetchTeamStandings(): Promise<TeamStandingsT[]> {
    const standings = await getTeamStandings(db);

    return standings.map((stand) => ({
        ...stand,
        beat: stand.beat?.split(",").map((v) => Number.parseInt(v)) ?? [],
    }));
}

export const prefetchStandingsQueryOptions = () =>
    queryOptions({
        queryKey: standingsKeys.all,
        queryFn: prefetchTeamStandings,
    });
