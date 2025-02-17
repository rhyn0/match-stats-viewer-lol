/** This table defines a singular player in a match and any statistics we want to associate with this occurrence of gameplay. */

import { relations, sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { teams } from "./team";

export const placements = sqliteTable("placements", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    teamId: integer("team_id")
        .notNull()
        .references(() => teams.id),
    dateCreated: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    standing: integer().notNull(),
    probability: real().notNull(),
});

export const placementPossibilityForTeamRel = relations(
    placements,
    ({ one }) => ({
        teamPlacementsRel: one(teams, {
            fields: [placements.teamId],
            references: [teams.id],
        }),
    }),
);

export const teamsPossiblePlacementsRel = relations(teams, ({ many }) => ({
    possiblePlacements: many(placements),
}));

export type PlacementSelectT = typeof placements.$inferSelect;
