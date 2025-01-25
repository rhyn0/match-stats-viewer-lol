"use client";

import { TypoH1 } from "@/components/typography/headings";
import { Spinner } from "@/components/ui/spinner";
import { queryListTeamStatsOptions } from "@/features/stat-teams/api/get-all-team-stats";
import TeamStatTable from "@/features/stat-teams/components/table";
import divideDefault from "@/lib/divide-by-zero";
import { useQuery } from "@tanstack/react-query";

import type { TeamStatRecordI } from "@/features/stat-teams/types";

export default function ClienTable() {
    const allTeamStatsQuery = useQuery(queryListTeamStatsOptions());
    if (allTeamStatsQuery.isPending) {
        return <Spinner size="lg" />;
    }

    if (allTeamStatsQuery.isError) {
        return (
            <div>
                <TypoH1>Error {allTeamStatsQuery.error?.message}</TypoH1>
            </div>
        );
    }

    const data: TeamStatRecordI[] = allTeamStatsQuery.data.map((record) => ({
        teamName: record.teamName,
        defaultName: record.defaultName,
        gamesPlayed:
            record.matchStats.blueGamesPlayed +
            record.matchStats.redGamesPlayed,
        averageGameTime: record.matchStats.averageGameTime,
        blueWinRate: divideDefault(
            record.matchStats.blueWins,
            record.matchStats.blueGamesPlayed,
            0,
        ),
        redWinRate: divideDefault(
            record.matchStats.redWins,
            record.matchStats.redGamesPlayed,
            0,
        ),
        overallWinRate: divideDefault(
            record.matchStats.redWins + record.matchStats.blueWins,
            record.matchStats.blueGamesPlayed +
                record.matchStats.redGamesPlayed,
            0,
        ),
    }));
    return <TeamStatTable data={data} />;
}
