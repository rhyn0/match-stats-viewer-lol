import env from "@/config/env";
import schema from "@/db/schema";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const queryClient = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
});
const db = drizzle(queryClient, {
    schema,
});
export default db;
