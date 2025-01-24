import { TypoH1 } from "@/components/typography/headings";
import { queryListTeamStatsOptions } from "@/features/stat-teams/api/get-all-team-stats";
import TeamStatTable from "@/features/stat-teams/components/table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stats/team")({
    component: RouteComponent,
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(queryListTeamStatsOptions()),
});

function RouteComponent() {
    return (
        <main className="mx-8 bg-background">
            <TypoH1 className="justify-center flex text-foreground">
                Team Stats
            </TypoH1>
            <TeamStatTable />
        </main>
    );
}
