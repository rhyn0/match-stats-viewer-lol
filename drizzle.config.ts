import { defineConfig } from "drizzle-kit";
import env from "@/config/env";

export default defineConfig({
    dialect: "turso",
    schema: "./app/db/schema/",
    dbCredentials: {
        url: env.TURSO_DATABASE_URL,
        authToken: env.TURSO_AUTH_TOKEN,
    },
    verbose: true,
    strict: true,
    out: "./db/migrations",
});
