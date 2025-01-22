import { LeagueScope } from "./league";

export const PlayerArk = LeagueScope.type({
    id: "number",
    teamId: "number | null",
    name: "string",
    summonerName: "/^.+#.{3,5}$/",
    designatedPosition: "positionMaybe",
});

export type PlayerT = typeof PlayerArk.infer;
