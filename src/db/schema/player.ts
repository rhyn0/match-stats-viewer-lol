import { playerPositionOptions } from "@/types/league";
import { relations } from "drizzle-orm";
/** Specifics about player performance in the tournament. */
import {
    integer,
    sqliteTable,
    text,
    uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { teams } from "./team";

export const players = sqliteTable(
    "players",
    {
        id: integer("id", { mode: "number" }).primaryKey({
            autoIncrement: true,
        }),
        teamId: integer("team_id").references(() => teams.id), // if null, they are a sub
        name: text("player_name").notNull(),
        summonerName: text("summoner_name").notNull(),
        designatedPosition: text("position", {
            enum: playerPositionOptions,
        }).notNull(),
    },
    (players) => [uniqueIndex("player_name_uniq_idx").on(players.name)],
);
export const teamPlayersRel = relations(teams, ({ many }) => ({
    teamPlayersRel: many(players),
}));
export const playerTeamRel = relations(players, ({ one }) => ({
    playerTeamRel: one(teams, {
        fields: [players.teamId],
        references: [teams.id],
        relationName: "playerTeamRel",
    }),
}));

export type PlayerSelectT = typeof players.$inferSelect;
