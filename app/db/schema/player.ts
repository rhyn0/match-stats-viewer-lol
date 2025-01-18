/** Specifics about player performance in the tournament. */
import {
    sqliteTable,
    integer,
    uniqueIndex,
    text,
} from "drizzle-orm/sqlite-core";
import { teams } from "./team";

export const players = sqliteTable(
    "players",
    {
        id: integer("id", { mode: "number" }).primaryKey({
            autoIncrement: true,
        }),
        teamId: integer("team_id").references(() => teams.id), // if its null they are a sub
        name: text("player_name").notNull(),
    },
    (players) => [uniqueIndex("player_name_uniq_idx").on(players.name)],
);
