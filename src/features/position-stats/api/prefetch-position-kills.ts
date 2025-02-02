import { getKillsPerPosition } from "@/lib/crud/position-stats";
import db from "@/lib/drizzle-db";
import { queryOptions } from "@tanstack/react-query";
import type { PositionKillsT } from "../types";
import positionKeys from "./keys";

async function prefetchPositionKills(): Promise<PositionKillsT[]> {
    return getKillsPerPosition(db);
}
export const prefetchPositionKillsQueryOptions = () =>
    queryOptions({
        queryKey: positionKeys.kills,
        queryFn: prefetchPositionKills,
    });
