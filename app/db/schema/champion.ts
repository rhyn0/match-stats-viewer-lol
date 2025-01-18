/** Statistics about each agent's performance in the tournament. */

import { relations } from "drizzle-orm";
import {
    integer,
    sqliteTable,
    text,
    uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { playerMatches } from "./player-match";

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

export const championInPlayerMatchRel = relations(champions, ({ many }) => ({
    championInPlayerMatchRel: many(playerMatches),
}));
