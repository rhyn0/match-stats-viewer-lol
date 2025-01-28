"use client";

import { TypoH1 } from "@/components/typography/headings";
import { Button } from "@/components/ui/button";
import PlayerCard from "@/features/team-viewer/components/player-card";
import useTeamIdQuery from "@/features/team-viewer/hooks/use-get-team";
import Link from "next/link";

export default function TeamIdCardClient({ teamId }: { teamId: number }) {
    const teamDataQuery = useTeamIdQuery({ teamId });
    if (teamDataQuery.isError) {
        return (
            <div>
                An unexpected error occurred
                <span>{teamDataQuery.error?.message}</span>
            </div>
        );
    }
    return (
        <>
            <TypoH1 className="text-4xl font-bold mb-8">
                Team :{" "}
                {teamDataQuery.data.teamName ?? teamDataQuery.data.defaultName}
            </TypoH1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {teamDataQuery.data.players.map((player) => (
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
        </>
    );
}
