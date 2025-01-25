import { TypoH1 } from "@/components/typography/headings";
import { queryListTeamStatsOptions } from "@/features/stat-teams/api/get-all-team-stats";
import TeamStatTable from "@/features/stat-teams/components/table";
import { getQueryClient } from "@/lib/query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default function RouteComponent() {
    const queryClient = getQueryClient();
    queryClient.prefetchQuery(queryListTeamStatsOptions());
    return (
        <main className="mx-8 bg-background">
            <TypoH1 className="justify-center flex text-foreground">
                Team Stats
            </TypoH1>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <TeamStatTable />
            </HydrationBoundary>
        </main>
    );
}
