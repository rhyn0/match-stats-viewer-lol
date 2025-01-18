import {
    sqliteTable,
    integer,
    text,
    uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
    "users",
    {
        id: integer("id", { mode: "number" }).primaryKey({
            autoIncrement: true,
        }),
        email: text("user_email").notNull(),
        role: text({ enum: ["admin", "user"] }).notNull(),
    },
    (t) => [uniqueIndex("user_email_idx").on(t.email)],
);
