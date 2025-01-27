import { createColumnHelper } from "@tanstack/react-table";

import divideDefault from "@/lib/divide-by-zero";
// type imports
import type { ChampionPresenceT } from "../types";

const presenceColumnHelper = createColumnHelper<ChampionPresenceT>();

export const columns = [
    presenceColumnHelper.accessor("champion", {
        header: "Champion Name",
        meta: {
            filterVariant: "text",
        },
    }),
    presenceColumnHelper.group({
        header: "Ban",
        columns: [
            presenceColumnHelper.accessor(
                (row) => `${row.bans} / ${row.totalGames}`,
                {
                    header: "Ban Number",
                    meta: {
                        filterVariant: "range",
                    },
                    sortingFn: (rowA, rowB) =>
                        rowA.original.bans > rowB.original.bans
                            ? 1
                            : rowA.original.bans < rowB.original.bans
                              ? -1
                              : 0,
                },
            ),
            presenceColumnHelper.accessor(
                (row) => divideDefault(row.bans, row.totalGames, 0),
                {
                    header: "Ban Rate",
                    meta: {
                        filterVariant: "range",
                    },
                    cell({ getValue }) {
                        const value: number = getValue();
                        return value.toFixed(3);
                    },
                },
            ),
        ],
    }),
    presenceColumnHelper.group({
        header: "Picks",
        columns: [
            presenceColumnHelper.accessor(
                (row) => `${row.picks} / ${row.totalGames}`,
                {
                    header: "Pick Number",
                    meta: {
                        filterVariant: "range",
                    },
                    sortingFn: (rowA, rowB) =>
                        rowA.original.picks > rowB.original.picks
                            ? 1
                            : rowA.original.picks < rowB.original.picks
                              ? -1
                              : 0,
                },
            ),
            presenceColumnHelper.accessor(
                (row) => divideDefault(row.picks, row.totalGames, 0),
                {
                    header: "Pick Rate",
                    meta: {
                        filterVariant: "range",
                    },
                    cell({ getValue }) {
                        const value: number = getValue();
                        return value.toFixed(3);
                    },
                },
            ),
        ],
    }),
    presenceColumnHelper.group({
        header: "Total Presence",
        columns: [
            presenceColumnHelper.accessor(
                (row) => `${row.bans + row.picks} / ${row.totalGames}`,
                {
                    header: "Presence Number",
                    meta: {
                        filterVariant: "range",
                    },
                    sortingFn: (rowA, rowB) => {
                        const rowATotalPresence =
                            rowA.original.picks + rowA.original.bans;
                        const rowBTotalPresence =
                            rowB.original.picks + rowB.original.bans;
                        return rowATotalPresence > rowBTotalPresence
                            ? 1
                            : rowATotalPresence < rowBTotalPresence
                              ? -1
                              : 0;
                    },
                },
            ),
            presenceColumnHelper.accessor(
                (row) => divideDefault(row.picks + row.bans, row.totalGames, 0),
                {
                    header: "Ratio",
                    meta: {
                        filterVariant: "range",
                    },
                    cell({ getValue }) {
                        const value: number = getValue();
                        return value.toFixed(3);
                    },
                },
            ),
        ],
    }),
];
