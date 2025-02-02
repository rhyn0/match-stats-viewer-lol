/** This table defines a singular player in a match and any statistics we want to associate with this occurrence of gameplay. */

import { playerPositionOptions } from "@/types/league";
import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { matches } from "./match";
import { players } from "./player";

export const playerMatches = sqliteTable("player_matches", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    playerId: integer("player_id").references(() => players.id),
    matchId: integer("match_id").references(() => matches.id),
    rawKDA: text("raw_kda", { length: 10 }).notNull(),
    position: text({ enum: playerPositionOptions }).notNull(),
    // TODO<ryan>: we should store champion data external to this table
    // fastest way forward right now is to just store championName
    // playerChampionId: integer("champion_id").references(() => champions.id),
    playerChampionName: text("champion_name").notNull(),
    playerKills: integer("player_kills").notNull(),
    playerDeaths: integer("player_deaths").notNull(),
    playerAssists: integer("player_assists").notNull(),
    // While doing migration, set these defaults
    killParticipation: real("kill_participation").default(0).notNull(),
    bluePlayer: integer("on_blue_team", { mode: "boolean" })
        .default(false)
        .notNull(),
});

export const playerWhoPlayedRel = relations(playerMatches, ({ one }) => ({
    playerWhoPlayedRel: one(players, {
        fields: [playerMatches.playerId],
        references: [players.id],
    }),
}));

export const matchRel = relations(playerMatches, ({ one }) => ({
    matchRel: one(matches, {
        fields: [playerMatches.matchId],
        references: [matches.id],
    }),
}));
export const playersMatchRel = relations(players, ({ many }) => ({
    playerMatchesRel: many(playerMatches),
}));

export type PlayerMatchSelectT = typeof playerMatches.$inferSelect;
