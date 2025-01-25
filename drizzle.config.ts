import env from "@/config/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "turso",
    schema: "./src/db/schema/",
    dbCredentials: {
        url: env.TURSO_DATABASE_URL,
        authToken: env.TURSO_AUTH_TOKEN,
    },
    verbose: true,
    strict: true,
    out: "./src/db/migrations",
});
