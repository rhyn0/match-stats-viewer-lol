import {
    integer,
    sqliteTable,
    text,
    uniqueIndex,
} from "drizzle-orm/sqlite-core";

// TODO: this isnt valorant
export const championNameEnum = [
    "Astra",
    "Breach",
    "Brimstone",
    "Chamber",
    "Clove",
    "Cypher",
    "Deadlock",
    "Fade",
    "Gekko",
    "Harbor",
    "Iso",
    "Jett",
    "Kayo",
    "Killjoy",
    "Neon",
    "Omen",
    "Phoenix",
    "Raze",
    "Reyna",
    "Sage",
    "Skye",
    "Sova",
    "Viper",
    "Yoru",
] as const;

export type championName =
    (typeof championNameEnum)[keyof typeof championNameEnum];

export const champions = sqliteTable(
    "agents",
    {
        id: integer("id", { mode: "number" }).primaryKey({
            autoIncrement: true,
        }),
        name: text("agent_name").notNull(),
    },
    (agents) => [uniqueIndex("agent_name_uniq_idx").on(agents.name)],
);
