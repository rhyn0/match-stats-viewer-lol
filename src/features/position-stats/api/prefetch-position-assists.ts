import { getAssistsPerPosition } from "@/lib/crud/position-stats";
import db from "@/lib/drizzle-db";
import { queryOptions } from "@tanstack/react-query";
import type { PositionAssistsT } from "../types";
import positionKeys from "./keys";

async function prefetchPositionAssists(): Promise<PositionAssistsT[]> {
    return getAssistsPerPosition(db);
}
export const prefetchPositionAssistsQueryOptions = () =>
    queryOptions({
        queryKey: positionKeys.assists,
        queryFn: prefetchPositionAssists,
    });
