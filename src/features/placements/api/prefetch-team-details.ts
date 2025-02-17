import teamKeys from "@/features/team-viewer/api/keys";
import { type TeamListT, listTeamIdNames } from "@/lib/crud/team-list";
import db from "@/lib/drizzle-db";
import { queryOptions } from "@tanstack/react-query";

async function prefetchTeamIdNames(): Promise<TeamListT[]> {
    return listTeamIdNames(db);
}
export const prefetchTeamIdNamesQueryOptions = () =>
    queryOptions({
        queryKey: teamKeys.all,
        queryFn: prefetchTeamIdNames,
    });
