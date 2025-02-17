import { TypoH1 } from "@/components/typography/headings";
import { prefetchTeamIdNamesQueryOptions } from "@/features/placements/api/prefetch-team-details";
import { getQueryClient } from "@/lib/query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import ClientPlacements from "./client";

export default async function PlacementPage() {
    const queryClient = getQueryClient();
    queryClient.prefetchQuery(prefetchTeamIdNamesQueryOptions());
    return (
        <main>
            <TypoH1 className="text-center my-8">
                Probability Team Ends At X Rank
            </TypoH1>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ClientPlacements />
            </HydrationBoundary>
        </main>
    );
}
