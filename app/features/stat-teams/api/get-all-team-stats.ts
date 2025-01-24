import db from "@/lib/drizzle-db";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import { type } from "arktype";
import { TeamGameDataArk, type TeamStatQueryT } from "../types";
import { calculateTeamStats } from "../utils/team-matches-to-stats";
import teamsStatKeys from "./keys";

import type { TeamGameDataT } from "../types";

export const queryTeamById = createServerFn({ method: "GET" }).handler(
    async (): Promise<TeamGameDataT[]> => {
        const queryRes = (await db.query.teams.findMany({
            columns: {
                modifiedAt: false,
            },
            with: {
                matchesForTeamARel: {
                    columns: {
                        blueWon: true,
                        gameTimeSeconds: true,
                    },
                },
                matchesForTeamBRel: {
                    columns: {
                        blueWon: true,
                        gameTimeSeconds: true,
                    },
                },
            },
        })) as TeamStatQueryT[];

        return queryRes.map((res) => calculateTeamStats(res));
    },
);
const TeamGameDataArrayArk = TeamGameDataArk.array();
export const queryListTeamStatsOptions = () =>
    queryOptions({
        queryKey: teamsStatKeys.all,
        queryFn: async () => {
            const data = await queryTeamById();
            const parsed = TeamGameDataArrayArk(data);
            if (parsed instanceof type.errors) {
                throw new Error("Received invalid TeamStat data");
            }
            return parsed;
        },
    });
