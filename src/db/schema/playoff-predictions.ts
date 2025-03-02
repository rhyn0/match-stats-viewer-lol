/** This table defines a singular player in a match and any statistics we want to associate with this occurrence of gameplay. */

import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const playoffPredictions = sqliteTable("playoff_predictions", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text().unique().notNull(),
    result1: integer("quarter_1", { mode: "boolean" }).notNull(),
    result2: integer("quarter_2", { mode: "boolean" }).notNull(),
    result3: integer("quarter_3", { mode: "boolean" }).notNull(),
    result4: integer("quarter_4", { mode: "boolean" }).notNull(),
    result5: integer("semi_1", { mode: "boolean" }).notNull(),
    result6: integer("semi_2", { mode: "boolean" }).notNull(),
    result7: integer("finals", { mode: "boolean" }).notNull(),
    createdDate: integer("match_date", { mode: "timestamp" }).default(
        sql`CURRENT_TIMESTAMP`,
    ),
});

export type PlayoffPredictSelectT = typeof playoffPredictions.$inferSelect;
export type PlayoffPredictInsertT = typeof playoffPredictions.$inferInsert;
