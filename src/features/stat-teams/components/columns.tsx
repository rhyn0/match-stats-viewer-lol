import { createColumnHelper } from "@tanstack/react-table";

// type imports
import type { TeamStatRecordI } from "@/features/stat-teams/types";

const teamColumnHelper = createColumnHelper<TeamStatRecordI>();

export const columns = [
    teamColumnHelper.group({
        header: "Team Info",
        columns: [
            teamColumnHelper.accessor("defaultName", {
                header: "Team Name",
                meta: {
                    filterVariant: "select",
                },
            }),
            teamColumnHelper.accessor("teamName", {
                header: "Display Name",
                meta: {
                    filterVariant: "select",
                },
            }),
        ],
    }),
    teamColumnHelper.group({
        header: "Match Stats",
        columns: [
            teamColumnHelper.accessor("gamesPlayed", {
                header: "Number of Games Played",
                meta: {
                    filterVariant: "range",
                },
            }),
            teamColumnHelper.accessor("overallWinRate", {
                header: "Overall Win Rate",
                meta: {
                    filterVariant: "range",
                },
                cell: ({ getValue }) => {
                    const value: number = getValue();
                    return value.toFixed(3);
                },
            }),
        ],
    }),
    teamColumnHelper.group({
        header: "Match Side Stats",
        columns: [
            teamColumnHelper.accessor("blueWinRate", {
                header: "Blue Side Win Rate",
                meta: {
                    filterVariant: "range",
                },
            }),
            teamColumnHelper.accessor("redWinRate", {
                header: "Red Side Win Rate",
                meta: {
                    filterVariant: "range",
                },
            }),
            teamColumnHelper.accessor("averageGameTime", {
                header: "Average Game Time (sec)",
                meta: {
                    filterVariant: "range",
                },
                cell: ({ getValue }) => {
                    const value: number = getValue();
                    return value.toFixed(3);
                },
            }),
        ],
    }),
];
