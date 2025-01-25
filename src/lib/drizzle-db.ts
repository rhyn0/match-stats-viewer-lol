import env from "@/config/env";
import * as matchesSchema from "@/db/schema/match";
import * as playersSchema from "@/db/schema/player";
import * as playerMatchesSchema from "@/db/schema/player-match";
import * as teamsSchema from "@/db/schema/team";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const queryClient = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
});
const db = drizzle(queryClient, {
    schema: {
        ...matchesSchema,
        ...playerMatchesSchema,
        ...teamsSchema,
        ...playersSchema,
    },
});
export default db;
