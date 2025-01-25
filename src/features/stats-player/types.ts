import { type } from "arktype";

import type { PlayerSelectT } from "@/db/schema/player";
import type { PlayerMatchSelectT } from "@/db/schema/player-match";
import type { TeamSelectT } from "@/db/schema/team";

export const OverallPlayerStatRecordArk = type({
    id: "number.integer",
    summonerName: "string > 0",
    teamName: "string > 0",
    totalKills: "number.integer >= 0",
    totalDeaths: "number.integer >= 0",
    totalAssists: "number.integer >= 0",
    gamesPlayed: "number.integer >= 0",
    champions: {
        mostPlayed: "string | null",
    },
});

export type OverallPlayerStatRecordT = typeof OverallPlayerStatRecordArk.infer;
type PlayerT = Pick<PlayerSelectT, "id" | "summonerName">;
type TeamT = Pick<TeamSelectT, "id" | "defaultName" | "teamName">;
type PlayerMatchT = Pick<
    PlayerMatchSelectT,
    | "matchId"
    | "position"
    | "playerChampionName"
    | "playerKills"
    | "playerDeaths"
    | "playerAssists"
>;
export type OverallPlayerStatQueryT = PlayerT & {
    playerMatchesRel: PlayerMatchT[];
    playerTeamRel: TeamT | null;
};
