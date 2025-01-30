import { TypoH1 } from "@/components/typography/headings";
import { listScheduleQueryOptions } from "@/features/schedule/api/list-schedule";
import MatchList from "@/features/schedule/components/match-list";
import { getQueryClient } from "@/lib/query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default function Schedule() {
    const queryClient = getQueryClient();
    queryClient.prefetchQuery(listScheduleQueryOptions());

    return (
        <main>
            <TypoH1 className="text-center mb-8 font-bangers tracking-wide">
                Schedule
            </TypoH1>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <MatchList />
            </HydrationBoundary>
        </main>
    );
}
