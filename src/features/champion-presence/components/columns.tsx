import divideDefault from "@/lib/divide-by-zero";
import { createColumnHelper } from "@tanstack/react-table";

// type imports
import type { ChampionPresenceT } from "../types";

const presenceColumnHelper = createColumnHelper<ChampionPresenceT>();

export const columns = [
    presenceColumnHelper.accessor("champName", {
        header: "Champion Name",
        meta: {
            filterVariant: "text",
        },
    }),
    presenceColumnHelper.group({
        header: "Ban",
        columns: [
            presenceColumnHelper.accessor(
                (row) => `${row.timesBanned} / ${row.totalMatches}`,
                {
                    header: "Ban Number",
                    meta: {
                        filterVariant: "range",
                    },
                    sortingFn: (rowA, rowB) =>
                        rowA.original.timesBanned > rowB.original.timesBanned
                            ? 1
                            : rowA.original.timesBanned <
                                rowB.original.timesBanned
                              ? -1
                              : 0,
                },
            ),
            presenceColumnHelper.accessor(
                (row) => divideDefault(row.timesBanned, row.totalMatches, 0),
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
                (row) => `${row.wins + row.losses} / ${row.totalMatches}`,
                {
                    header: "Pick Number",
                    meta: {
                        filterVariant: "range",
                    },
                    sortingFn: (rowA, rowB) => {
                        const picksA =
                            rowA.original.wins + rowA.original.losses;
                        const picksB =
                            rowB.original.wins + rowB.original.losses;
                        return picksA > picksB ? 1 : picksA < picksB ? -1 : 0;
                    },
                },
            ),
            presenceColumnHelper.accessor(
                (row) =>
                    divideDefault(row.wins + row.losses, row.totalMatches, 0),
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
        header: "Wins",
        columns: [
            presenceColumnHelper.accessor(
                (row) => `${row.wins} / ${row.wins + row.losses}`,
                {
                    header: "Wins Number",
                    meta: {
                        filterVariant: "range",
                    },
                    sortingFn: (rowA, rowB) => {
                        return rowA.original.wins > rowB.original.wins
                            ? 1
                            : rowA.original.wins < rowB.original.wins
                              ? -1
                              : 0;
                    },
                },
            ),
            presenceColumnHelper.accessor(
                (row) => divideDefault(row.wins, row.wins + row.losses, 0),
                {
                    header: "Win Ratio",
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
                (row) =>
                    `${row.wins + row.losses + row.timesBanned} / ${row.totalMatches}`,
                {
                    header: "Presence Number",
                    meta: {
                        filterVariant: "range",
                    },
                    sortingFn: (rowA, rowB) => {
                        const rowATotalPresence =
                            rowA.original.wins +
                            rowA.original.losses +
                            rowA.original.timesBanned;
                        const rowBTotalPresence =
                            rowB.original.wins +
                            rowA.original.losses +
                            rowB.original.timesBanned;
                        return rowATotalPresence > rowBTotalPresence
                            ? 1
                            : rowATotalPresence < rowBTotalPresence
                              ? -1
                              : 0;
                    },
                },
            ),
            presenceColumnHelper.accessor(
                (row) =>
                    divideDefault(
                        row.wins + row.losses + row.timesBanned,
                        row.totalMatches,
                        0,
                    ),
                {
                    header: "Presence Ratio",
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
