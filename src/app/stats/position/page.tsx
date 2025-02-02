import { TypoH1 } from "@/components/typography/headings";
import { prefetchPositionAssistsQueryOptions } from "@/features/position-stats/api/prefetch-position-assists";
import { prefetchPositionDeathsQueryOptions } from "@/features/position-stats/api/prefetch-position-deaths";
import { prefetchPositionKillsQueryOptions } from "@/features/position-stats/api/prefetch-position-kills";
import { getQueryClient } from "@/lib/query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import ChartsClient from "./client";

export default function PositionStatsPage() {
    const queryClient = getQueryClient();
    queryClient.prefetchQuery(prefetchPositionAssistsQueryOptions());
    queryClient.prefetchQuery(prefetchPositionDeathsQueryOptions());
    queryClient.prefetchQuery(prefetchPositionKillsQueryOptions());

    return (
        <main>
            <TypoH1 className="font-bangers tracking-wide text-center">
                Position KDA Stats
            </TypoH1>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ChartsClient />
            </HydrationBoundary>
        </main>
    );
}
