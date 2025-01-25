"use client";
import { DataTable } from "@/components/data-table";
import React from "react";
import { columns } from "./colums";

// type imports
import type { PaginationState } from "@tanstack/react-table";
import type { OverallPlayerStatRecordT } from "../types";

const columnPinning = {
    left: ["playerName", "teamName"],
};

export default function PlayerStatTable({
    data,
}: { data: OverallPlayerStatRecordT[] }) {
    const [tablePagination, setTablePagination] =
        React.useState<PaginationState>({
            pageIndex: 0,
            pageSize: 10,
        });

    return (
        <DataTable
            columns={columns}
            data={data}
            pageSizeChangingEnabled
            pagination={tablePagination}
            onPaginationChange={setTablePagination}
            columnPinning={columnPinning}
        />
    );
}
