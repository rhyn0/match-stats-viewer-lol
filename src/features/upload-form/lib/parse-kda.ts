import type { PlayerKdaT } from "@/types/player";
import type { RawKdaT } from "../types";

/**
 *
 * @param kda RawKdaT - Kills/Deaths/Assists
 * @returns PlayerKdaT -
 * @throws Error - if `kda` is not of correct form
 */
export function parseKda(kda: RawKdaT): PlayerKdaT {
    const components = kda.split("/");
    const [kills, deaths, assists] = components.map((n) => Number.parseInt(n));
    if (Number.isNaN(kills) || Number.isNaN(deaths) || Number.isNaN(assists)) {
        throw new Error(`Invalid KDA input ${kda}`);
    }
    return {
        raw: kda,
        kills,
        deaths,
        assists,
    };
}
