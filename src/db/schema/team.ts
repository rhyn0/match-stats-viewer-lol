/** Information regarding the teams, this will have id references to `players` */

import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const teams = sqliteTable("participating_teams", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    defaultName: text("default_name").notNull(),
    teamName: text("team_name"),
    modifiedAt: integer("modified_at", {
        mode: "timestamp",
    })
        .default(sql`CURRENT_TIMESTAMP`)
        .$onUpdateFn(() => new Date()),
});

export type TeamSelectT = typeof teams.$inferSelect;
