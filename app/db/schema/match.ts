/** This is the raw input of matches for the tournament. */

import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { playerMatches } from "./player-match";
import { teams } from "./team";

export const matches = sqliteTable("matches_played", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    blueTeam: integer("blue_team_id")
        .references(() => teams.id)
        .notNull(),
    redTeam: integer("red_team_id")
        .references(() => teams.id)
        .notNull(),
    blueWon: integer("blue_win", { mode: "boolean" }).notNull(),
    gameTimeSeconds: integer("game_time_seconds", { mode: "number" }).notNull(),
    playDate: integer("match_date", { mode: "timestamp" })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    isPlayoffs: integer("is_playoffs", { mode: "boolean" })
        .notNull()
        .default(false),
});

export const playerDetailsRel = relations(matches, ({ many }) => ({
    playerDetailsRel: many(playerMatches),
}));

export const teamDetailsRel = relations(matches, ({ one }) => ({
    teamDetailsARel: one(teams, {
        fields: [matches.blueTeam],
        references: [teams.id],
        relationName: "teamDetailsARel",
    }),
    teamDetailsBRel: one(teams, {
        fields: [matches.redTeam],
        references: [teams.id],
        relationName: "teamDetailsBRel",
    }),
}));
export const matchesForTeamRel = relations(teams, ({ many }) => ({
    matchesForTeamARel: many(matches, { relationName: "teamDetailsARel" }),
    matchesForTeamBRel: many(matches, { relationName: "teamDetailsBRel" }),
}));

export type MatchSelectT = typeof matches.$inferSelect;
