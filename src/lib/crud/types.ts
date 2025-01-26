import type {
    SQLiteDelete,
    SQLiteInsert,
    SQLiteSelect,
    SQLiteUpdate,
} from "drizzle-orm/sqlite-core";
import type db from "../drizzle-db";

type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export type Db = typeof db | Transaction;
export type Select = SQLiteSelect;
export type Update = SQLiteUpdate;
export type Delete = SQLiteDelete;
export type Insert = SQLiteInsert;
