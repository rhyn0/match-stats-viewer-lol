import { DataTable } from "@/components/data-table";
import { TypoH1 } from "@/components/typography/headings";
import { Spinner } from "@/components/ui/spinner";
import React from "react";
import useListPlayerStatsQuery from "../hooks/use-list-player-stats";
import { columns } from "./colums";

// type imports
import type { PaginationState } from "@tanstack/react-table";

const columnPinning = {
    left: ["playerName", "teamName"],
};

export default function PlayerStatTable() {
    const [tablePagination, setTablePagination] =
        React.useState<PaginationState>({
            pageIndex: 0,
            pageSize: 10,
        });
    const allPlayerStatsQuery = useListPlayerStatsQuery();
    if (allPlayerStatsQuery.isPending) {
        return <Spinner size="lg" />;
    }

    if (allPlayerStatsQuery.isError) {
        return (
            <div>
                <TypoH1>Error {allPlayerStatsQuery.error?.message}</TypoH1>
            </div>
        );
    }

    return (
        <DataTable
            columns={columns}
            data={allPlayerStatsQuery.data}
            pageSizeChangingEnabled
            pagination={tablePagination}
            onPaginationChange={setTablePagination}
            columnPinning={columnPinning}
        />
    );
}
