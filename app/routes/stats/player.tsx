import { TypoH1 } from "@/components/typography/headings";
import { queryAllPlayerStatsOptions } from "@/features/stats-player/api/list-player-stats";
import PlayerStatTable from "@/features/stats-player/components/table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stats/player")({
    component: RouteComponent,
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(queryAllPlayerStatsOptions()),
});

function RouteComponent() {
    return (
        <main className="mx-8">
            <TypoH1 className="justify-center flex text-foreground">
                Player Stats
            </TypoH1>
            <PlayerStatTable />
        </main>
    );
}
