import { matches } from "@/db/schema/match";
import { matchBans } from "@/db/schema/match-bans";
import { players } from "@/db/schema/player";
import { playerMatches } from "@/db/schema/player-match";
import { teams } from "@/db/schema/team";
import db from "@/lib/drizzle-db";
import { seed } from "drizzle-seed";

async function main() {
    await seed(
        // @ts-expect-error - hehe, i think i know what im doing
        db,
        { teams, players, matches, playerMatches, matchBans },
        { seed: 12345 },
    ).refine((f) => ({
        teams: {
            count: 10,
            with: {
                players: 5,
                matches: 2,
            },
        },
        players: {
            columns: {
                designatedPosition: f.valuesFromArray({
                    values: ["top", "jgl", "mid", "bot", "sup"],
                }),
            },
            with: {
                playerMatches: 2,
            },
        },
        matches: {
            columns: {
                gameTimeSeconds: f.int({ minValue: 1800, maxValue: 3600 }),
                gameWeek: f.int({ minValue: 1, maxValue: 4 }),
            },
            with: {
                matchBans: 1,
            },
        },
        playerMatches: {
            columns: {
                playerKills: f.int({ minValue: 0 }),
                playerDeaths: f.int({ minValue: 0 }),
                playerAssists: f.int({ minValue: 0 }),
            },
        },
        matchBans: {
            columns: {
                blueBan1: f.firstName(),
                blueBan2: f.firstName(),
                blueBan3: f.firstName(),
                blueBan4: f.firstName(),
                blueBan5: f.firstName(),
                redBan1: f.firstName(),
                redBan2: f.firstName(),
                redBan3: f.firstName(),
                redBan4: f.firstName(),
                redBan5: f.firstName(),
            },
        },
    }));
}

main();
// import { reset } from "drizzle-seed";
// // @ts-expect-error -- hahha
// await reset(db, { teams, players });
