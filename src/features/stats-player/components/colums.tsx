import { createColumnHelper } from "@tanstack/react-table";

import type { OverallPlayerStatRecordT } from "../types";

const playerColumnHelper = createColumnHelper<OverallPlayerStatRecordT>();

export const columns = [
    playerColumnHelper.group({
        header: "Player Info",
        columns: [
            playerColumnHelper.accessor("summonerName", {
                header: "Player",
                meta: {
                    filterVariant: "text",
                },
            }),
            playerColumnHelper.accessor("teamName", {
                header: "Team Name",
                meta: {
                    filterVariant: "select",
                },
            }),
        ],
    }),
    playerColumnHelper.group({
        header: "Summary Stats",
        columns: [
            playerColumnHelper.accessor("totalKills", {
                header: "Total Kills",
                meta: {
                    filterVariant: "range",
                },
            }),
            playerColumnHelper.accessor("totalDeaths", {
                header: "Total Deaths",
                meta: {
                    filterVariant: "range",
                },
            }),
            playerColumnHelper.accessor("totalAssists", {
                header: "Total Assists",
                meta: {
                    filterVariant: "range",
                },
            }),
        ],
    }),
    playerColumnHelper.group({
        header: "Kill Participation",
        columns: [
            playerColumnHelper.accessor<"killParticipation.min", number>(
                "killParticipation.min",
                {
                    header: "Minimum Kill Participation",
                    meta: {
                        filterVariant: "range",
                    },
                    cell: ({ getValue }) => getValue().toFixed(2),
                },
            ),
            playerColumnHelper.accessor<"killParticipation.avg", number>(
                "killParticipation.avg",
                {
                    header: "Average Kill Participation",
                    meta: {
                        filterVariant: "range",
                    },
                    cell: ({ getValue }) => getValue().toFixed(2),
                },
            ),
            playerColumnHelper.accessor<"killParticipation.max", number>(
                "killParticipation.max",
                {
                    header: "Maximum Kill Participation",
                    meta: {
                        filterVariant: "range",
                    },
                    cell: ({ getValue }) => getValue().toFixed(2),
                },
            ),
        ],
    }),
    playerColumnHelper.group({
        header: "Total Stats",
        columns: [
            playerColumnHelper.accessor("gamesPlayed", {
                header: "Total Games Played",
                meta: {
                    filterVariant: "range",
                },
            }),
        ],
    }),
];
