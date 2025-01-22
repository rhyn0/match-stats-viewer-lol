import { players } from "@/db/schema/player";
import { teams } from "@/db/schema/team";
import db from "@/lib/drizzle-db";
import { seed } from "drizzle-seed";

async function main() {
    // @ts-expect-error - hehe, i think i know what im doing
    await seed(db, { teams, players }).refine((f) => ({
        teams: {
            count: 10,
            with: {
                players: 5,
            },
        },
        players: {
            columns: {
                designatedPosition: f.valuesFromArray({
                    values: ["top", "jgl", "mid", "bot", "sup"],
                }),
            },
        },
    }));
}

main();
// import { reset } from "drizzle-seed";
// // @ts-expect-error -- hahha
// await reset(db, { teams, players });
