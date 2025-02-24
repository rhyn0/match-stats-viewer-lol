import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prefetchStandingsQueryOptions } from "@/features/standings/api/prefetch-list-standings";
import StandingTableLoading from "@/features/standings/components/loading";
import TournamentStandings from "@/features/standings/components/standings-table";
import { getQueryClient } from "@/lib/query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import React from "react";

export default async function StandingsPage() {
    const queryClient = getQueryClient();

    queryClient.prefetchQuery(prefetchStandingsQueryOptions());

    return (
        <main>
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Tournament Standings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <React.Suspense fallback={<StandingTableLoading />}>
                            <TournamentStandings />
                        </React.Suspense>
                    </HydrationBoundary>
                </CardContent>
            </Card>
        </main>
    );
}
