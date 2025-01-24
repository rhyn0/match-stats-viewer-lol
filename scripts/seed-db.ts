import { matches } from "@/db/schema/match";
import { players } from "@/db/schema/player";
import { teams } from "@/db/schema/team";
import db from "@/lib/drizzle-db";
import { seed } from "drizzle-seed";

async function main() {
    // @ts-expect-error - hehe, i think i know what im doing
    await seed(db, { teams, players, matches }, { seed: 12345 }).refine(
        (f) => ({
            teams: {
                count: 10,
                with: {
                    players: 5,
                    // matches: 2,
                },
            },
            players: {
                columns: {
                    designatedPosition: f.valuesFromArray({
                        values: ["top", "jgl", "mid", "bot", "sup"],
                    }),
                },
            },
            matches: {
                columns: {
                    gameTimeSeconds: f.int({ minValue: 1800, maxValue: 3600 }),
                },
            },
        }),
    );
}

main();
// import { reset } from "drizzle-seed";
// // @ts-expect-error -- hahha
// await reset(db, { teams, players });
