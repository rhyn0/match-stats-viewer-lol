"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { queryAllTeamsQueryOptions } from "@/features/team-viewer/api/list-teams";
import TeamCard from "@/features/team-viewer/components/team-card";
import { cn } from "@/lib/cn";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function TeamGrid({ className }: { className?: string }) {
    const teamsQuery = useQuery(queryAllTeamsQueryOptions());
    if (teamsQuery.isPending) {
        return <Spinner size="lg" />;
    }
    if (teamsQuery.isError) {
        return (
            <div>
                Woops an unexpected error happened.
                <span>{teamsQuery.error.message}</span>
            </div>
        );
    }
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8", className)}>
            {teamsQuery.data.map((team) => (
                <TeamCard key={team.id} team={team}>
                    <Button asChild>
                        <Link href={`/team/${team.id}`}>View Team</Link>
                    </Button>
                </TeamCard>
            ))}
        </div>
    );
}
