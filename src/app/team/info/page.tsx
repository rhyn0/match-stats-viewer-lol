import { TypoH1 } from "@/components/typography/headings";
import { Button } from "@/components/ui/button";
import { queryAllTeamsQueryOptions } from "@/features/team-viewer/api/list-teams";
import TeamCard from "@/features/team-viewer/components/team-card";
import { getQueryClient } from "@/lib/query-client";
import Link from "next/link";

// TODO<ryan>: handle renavigation to this page as an error redirect from team info page
// if search param `error` is present, display the error message and then clear the search param

export default async function RouteComponent() {
    const queryClient = getQueryClient();
    const teams = await queryClient.ensureQueryData(
        queryAllTeamsQueryOptions(),
    );

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <TypoH1 className="text-4xl font-bold mb-8">
                SLOLCS 2025 Teams
            </TypoH1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teams.map((team) => (
                    <TeamCard key={team.id} team={team}>
                        <Button asChild>
                            <Link href={`/team/${team.id}`}>View Team</Link>
                        </Button>
                    </TeamCard>
                ))}
            </div>
        </main>
    );
}
