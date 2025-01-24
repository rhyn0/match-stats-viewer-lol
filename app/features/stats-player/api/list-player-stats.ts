import db from "@/lib/drizzle-db";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import { type } from "arktype";
import {
    type OverallPlayerStatQueryT,
    OverallPlayerStatRecordArk,
    type OverallPlayerStatRecordT,
} from "../types";
import { calculatePlayerStats } from "../utils/calculate-player-stats";
import playerStatKeys from "./keys";

export const queryAllPlayerStats = createServerFn({ method: "GET" }).handler(
    async (): Promise<OverallPlayerStatRecordT[]> => {
        const queryRes = (await db.query.players.findMany({
            columns: {
                id: true,
                summonerName: true,
            },
            with: {
                playerMatchesRel: {
                    columns: {
                        matchId: true,
                        position: true,
                        playerChampionName: true,
                        playerKills: true,
                        playerDeaths: true,
                        playerAssists: true,
                    },
                },
                playerTeamRel: {
                    columns: {
                        id: true,
                        defaultName: true,
                        teamName: true,
                    },
                },
            },
        })) as OverallPlayerStatQueryT[];

        return queryRes.map((res) => calculatePlayerStats(res));
    },
);
const OverallPlayerStatRecordArrayArk = OverallPlayerStatRecordArk.array();
export const queryAllPlayerStatsOptions = () =>
    queryOptions({
        queryKey: playerStatKeys.all,
        queryFn: async () => {
            const data = await queryAllPlayerStats();
            const parsed = OverallPlayerStatRecordArrayArk(data);
            if (parsed instanceof type.errors) {
                throw new Error("Received invalid PlayerStat data");
            }
            return parsed;
        },
    });
