"use client";

import { TypoH1 } from "@/components/typography/headings";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { queryTeamByIdQueryOptions } from "@/features/team-viewer/api/get-team";
import PlayerCard from "@/features/team-viewer/components/player-card";
import { getTeamIds } from "@/lib/get-team-ids-db";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export async function generateStaticParams() {
    return await getTeamIds();
}

export default function RouteComponent({
    params,
}: {
    params: Promise<{ teamId: string }>;
}) {
    const teamIdUse = React.use(params);
    const teamId = Number.parseInt(teamIdUse.teamId);
    const teamDataQuery = useQuery(queryTeamByIdQueryOptions(teamId));
    if (teamDataQuery.isPending) {
        return <Spinner size="lg" />;
    }
    if (teamDataQuery.isError) {
        return (
            <div>
                An unexpected error occurred
                <span>{teamDataQuery.error.message}</span>
            </div>
        );
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 space-y-10">
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
        </main>
    );
}
