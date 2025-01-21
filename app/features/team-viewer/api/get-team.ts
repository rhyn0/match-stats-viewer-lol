import db from "@/lib/drizzle-db";
import { queryOptions } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { type } from "arktype";
import { TeamArk } from "../types";
import teamsKeys from "./keys";

const TeamPlayerArk = type({
    "...": TeamArk.omit("players"),
    teamPlayersRel: TeamArk.get("players"),
});
const positiveNumberArk = type("number > 0");

export type GetTeamReturnI = typeof TeamPlayerArk.infer;
export const queryTeamById = createServerFn({ method: "GET" })
    .validator((d: unknown) => {
        const parsed = positiveNumberArk(d);
        if (parsed instanceof type.errors) {
            throw parsed;
        }
        return parsed;
    })
    .handler(async (ctx): Promise<GetTeamReturnI> => {
        const teamId = ctx.data;
        const queryRes = await db.query.teams.findFirst({
            where: (teams, { eq }) => eq(teams.id, teamId),
            with: {
                teamPlayersRel: true,
            },
        });
        if (!queryRes) {
            throw redirect({
                to: "/team/info",
                search: { error: "Team not found" },
            });
        }
        // @ts-expect-error - this is an error with drizzle not giving types for selecting with relationships
        return queryRes;
    });

export const queryTeamByIdQueryOptions = (teamId: number) =>
    queryOptions({
        queryKey: teamsKeys.detail(teamId),
        queryFn: async () => await queryTeamById({ data: teamId }),
    });
