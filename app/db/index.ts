import { drizzle } from "drizzle-orm/libsql";
import EnvData from "@/config/env";
const db = drizzle({
    connection: {
        url: EnvData.TURSO_DATABASE_URL,
        authToken: EnvData.TURSO_AUTH_TOKEN,
    },
});

export default db;
