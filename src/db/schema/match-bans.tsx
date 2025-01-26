import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { matches } from "./match";

export const matchBans = sqliteTable("bans_for_match", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    matchId: integer("match_id").references(() => matches.id),
    // when these columns are null, they mean that a ban was dropped due to rules
    blueBan1: text("blue_ban_1"),
    blueBan2: text("blue_ban_2"),
    blueBan3: text("blue_ban_3"),
    blueBan4: text("blue_ban_4"),
    blueBan5: text("blue_ban_5"),
    // red bans
    redBan1: text("red_ban_1"),
    redBan2: text("red_ban_2"),
    redBan3: text("red_ban_3"),
    redBan4: text("red_ban_4"),
    redBan5: text("red_ban_5"),
});

export const bansForMatch = relations(matchBans, ({ one }) => ({
    bansForMatch: one(matches, {
        fields: [matchBans.matchId],
        references: [matches.id],
        relationName: "bansForMatch",
    }),
}));

export type MatchBansSelectT = typeof matchBans.$inferSelect;
export type MatchBansInsertT = typeof matchBans.$inferInsert;
