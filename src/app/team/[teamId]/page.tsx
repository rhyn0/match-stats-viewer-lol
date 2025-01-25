import { TypoH1 } from "@/components/typography/headings";
import { Button } from "@/components/ui/button";
import { queryTeamByIdQueryOptions } from "@/features/team-viewer/api/get-team";
import PlayerCard from "@/features/team-viewer/components/player-card";
import { getQueryClient } from "@/lib/query-client";
import Link from "next/link";

export default async function RouteComponent({
    params,
}: {
    params: Promise<{ teamId: string }>;
}) {
    const queryClient = getQueryClient();
    const teamId = Number.parseInt((await params).teamId);
    const team = await queryClient.ensureQueryData(
        queryTeamByIdQueryOptions(teamId),
    );
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 space-y-10">
            <TypoH1 className="text-4xl font-bold mb-8">
                Team : {team.teamName ?? team.defaultName}
            </TypoH1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {team.players.map((player) => (
                    <PlayerCard
                        key={player.id}
                        name={player.summonerName}
                        position={player.designatedPosition}
                        mostPlayedChampion="TODO"
                        className="w-full"
                    >
                        <Button asChild disabled>
                            <Link href={`/player/${player.id}`}>
                                More stats
                            </Link>
                        </Button>
                    </PlayerCard>
                ))}
            </div>
        </main>
    );
}
