import { type } from "arktype";
import { LeagueScope } from "./league";

export const PlayerArk = LeagueScope.type({
    id: "number",
    teamId: "number | null",
    name: "string",
    // summonerName: "/^.+#.{3,5}$/",
    summonerName: "string",
    designatedPosition: "positionMaybe",
});

export type PlayerT = typeof PlayerArk.infer;
export const PlayerKdaArk = type({
    raw: /^\d{1,2}\/\d{1,2}\/\d{1,2}/,
    kills: "number.integer >= 0",
    deaths: "number.integer >= 0",
    assists: "number.integer >= 0",
});
export type PlayerKdaT = typeof PlayerKdaArk.infer;
