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
    presenceColumnHelper.accessor(
        (row) => divideDefault(row.picks + row.bans, row.totalGames, 0),
        {
            header: "Total Presence",
            meta: {
                filterVariant: "range",
            },
            cell({ getValue }) {
                const value: number = getValue();
                return value.toFixed(3);
            },
        },
    ),
];
