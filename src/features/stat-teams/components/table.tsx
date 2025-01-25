"use client";
import { DataTable } from "@/components/data-table";
import { TypoH1 } from "@/components/typography/headings";
import { Spinner } from "@/components/ui/spinner";
import divideDefault from "@/lib/divide-by-zero";
import React from "react";
import useListTeamStatsQuery from "../hooks/use-list-team-stats";
import { columns } from "./columns";

// type imports
import type { PaginationState } from "@tanstack/react-table";
import type { TeamStatRecordI } from "../types";

const columnPinning = {
    left: ["defaultName", "teamName"],
};

export default function TeamStatTable() {
    const [tablePagination, setTablePagination] =
        React.useState<PaginationState>({
            pageIndex: 0,
            pageSize: 10,
        });
    const allTeamStatsQuery = useListTeamStatsQuery();
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

    return (
        <DataTable
            columns={columns}
            data={data}
            pageSizeChangingEnabled={false}
            pagination={tablePagination}
            onPaginationChange={setTablePagination}
            columnPinning={columnPinning}
        />
    );
}
