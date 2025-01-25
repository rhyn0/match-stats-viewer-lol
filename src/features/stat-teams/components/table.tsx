"use client";
import { DataTable } from "@/components/data-table";
import React from "react";
import { columns } from "./columns";

// type imports
import type { PaginationState } from "@tanstack/react-table";
import type { TeamStatRecordI } from "../types";

const columnPinning = {
    left: ["defaultName", "teamName"],
};

export default function TeamStatTable({ data }: { data: TeamStatRecordI[] }) {
    const [tablePagination, setTablePagination] =
        React.useState<PaginationState>({
            pageIndex: 0,
            pageSize: 10,
        });

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
