import EnvData from "@/config/env";
import { drizzle } from "drizzle-orm/libsql";
const db = drizzle({
    connection: {
        url: EnvData.TURSO_DATABASE_URL,
        authToken: EnvData.TURSO_AUTH_TOKEN,
    },
});

export default db;
