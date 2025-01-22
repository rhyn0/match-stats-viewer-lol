import db from "@/lib/drizzle-db";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/start";
import { type } from "arktype";
import { TeamArk } from "../types";
import teamsKeys from "./keys";

const TeamPlayerArk = type({
    "...": TeamArk.omit("players"),
    teamPlayersRel: TeamArk.get("players"),
}).array();

export type ListTeamReturnI = typeof TeamPlayerArk.infer;
export const queryAllTeams = createServerFn({ method: "GET" }).handler(
    async (): Promise<ListTeamReturnI> => {
        // @ts-expect-error - this is an error with drizzle not giving types for selecting with relationships
        return await db.query.teams.findMany({
            with: {
                teamPlayersRel: true,
            },
        });
    },
);

export const queryAllTeamsQueryOptions = () =>
    queryOptions({
        queryKey: teamsKeys.all,
        queryFn: async () => await queryAllTeams(),
    });
