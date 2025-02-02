import { TypoH1 } from "@/components/typography/headings";
import { getWeeklyAssistsPrefetchQueryOptions } from "@/features/weekly-stats/api/prefetch-weekly-assists";
import { getWeeklyDeathsPrefetchQueryOptions } from "@/features/weekly-stats/api/prefetch-weekly-deaths";
import { getWeeklyKillsPrefetchQueryOptions } from "@/features/weekly-stats/api/prefetch-weekly-kills";
import { getQueryClient } from "@/lib/query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import ChartsClient from "./client";

export default function WeeklyStatsPage() {
    const queryClient = getQueryClient();
    queryClient.prefetchQuery(getWeeklyKillsPrefetchQueryOptions());
    queryClient.prefetchQuery(getWeeklyDeathsPrefetchQueryOptions());
    queryClient.prefetchQuery(getWeeklyAssistsPrefetchQueryOptions());

    return (
        <main>
            <TypoH1 className="font-bangers tracking-wide text-center">
                Weekly Stats
            </TypoH1>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ChartsClient />
            </HydrationBoundary>
        </main>
    );
}
