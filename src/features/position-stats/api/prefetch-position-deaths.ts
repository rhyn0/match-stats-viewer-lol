import { getDeathsPerPosition } from "@/lib/crud/position-stats";
import db from "@/lib/drizzle-db";
import { queryOptions } from "@tanstack/react-query";
import type { PositionDeathsT } from "../types";
import positionKeys from "./keys";

async function prefetchPositionDeaths(): Promise<PositionDeathsT[]> {
    return getDeathsPerPosition(db);
}
export const prefetchPositionDeathsQueryOptions = () =>
    queryOptions({
        queryKey: positionKeys.deaths,
        queryFn: prefetchPositionDeaths,
    });
