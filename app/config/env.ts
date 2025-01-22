import { type } from "arktype";
import { config } from "dotenv";

const path = process.env.NODE_ENV === "production" ? ".env" : ".env.local";
config({ path });

const envData = type({
    "+": "delete",
    TURSO_DATABASE_URL: "string.url",
    TURSO_AUTH_TOKEN: "string > 1",
});

export type TEnvData = typeof envData.infer;

const parsed = envData(process.env);
if (parsed instanceof type.errors) {
    throw new Error("Invalid process.env Data for this application");
}
export default parsed as TEnvData;
