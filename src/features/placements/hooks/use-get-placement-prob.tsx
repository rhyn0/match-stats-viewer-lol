import { useSuspenseQuery } from "@tanstack/react-query";
import { getTeamPlacementProbQueryOptions } from "../api/get-placement-prob";

import type { ExtraQueryOptionsI } from "@/types";
import type placementProbKeys from "../api/keys";
import type { PlacementProbT } from "../types";

type Key = ReturnType<(typeof placementProbKeys)["detail"]>;

export interface usePlacementProbQueryProps
    extends ExtraQueryOptionsI<PlacementProbT[], Key> {
    teamId: number;
}

export default function useGetTeamPlacementProbQuery({
    teamId,
    ...options
}: usePlacementProbQueryProps) {
    return useSuspenseQuery({
        ...getTeamPlacementProbQueryOptions(teamId),
        ...options,
    });
}
