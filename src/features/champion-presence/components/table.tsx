"use client";
import { DataTable } from "@/components/data-table";
import React from "react";
import { columns } from "./columns";

// type imports
import type { PaginationState } from "@tanstack/react-table";
import type { ChampionPresenceT } from "../types";

const columnPinning = {
    left: ["champion"],
};

export default function ChampionPresenceTable({
    data,
}: { data: ChampionPresenceT[] }) {
    const [tablePagination, setTablePagination] =
        React.useState<PaginationState>({
            pageIndex: 0,
            pageSize: 10,
        });

    return (
        <DataTable
            // @ts-ignore
            columns={columns}
            data={data}
            pageSizeChangingEnabled={false}
            pagination={tablePagination}
            onPaginationChange={setTablePagination}
            columnPinning={columnPinning}
        />
    );
}
