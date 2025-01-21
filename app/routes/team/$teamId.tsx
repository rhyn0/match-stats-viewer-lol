import { TypoH1 } from "@/components/typography/headings";
import { Button } from "@/components/ui/button";
import { queryTeamByIdQueryOptions } from "@/features/team-viewer/api/get-team";
import PlayerCard from "@/features/team-viewer/components/player-card";
import { Link, createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/team/$teamId")({
    component: RouteComponent,
    loader: ({ context: { queryClient }, params: { teamId } }) =>
        queryClient.ensureQueryData(
            queryTeamByIdQueryOptions(Number.parseInt(teamId)),
        ),
});

function RouteComponent() {
    const team = Route.useLoaderData();
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 space-y-10">
            <TypoH1 className="text-4xl font-bold mb-8">
                Team : {team.teamName ?? team.defaultName}
            </TypoH1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {team.teamPlayersRel.map((player) => (
                    <PlayerCard
                        key={player.id}
                        name={player.summonerName}
                        position={player.designatedPosition}
                        mostPlayedChampion="TODO"
                        className="w-full"
                    >
                        <Button asChild>
                            <Link to="/" params={{ playerId: player.id }}>
                                More stats
                            </Link>
                        </Button>
                    </PlayerCard>
                ))}
            </div>
        </main>
    );
}
