import { PlayerPositionsArk } from "@/types/league";
import { championValidatorArk } from "@/types/league";
import { PlayerKdaArk } from "@/types/player";
import { type } from "arktype";

import type { MatchSelectT } from "@/db/schema/match";
import type { TeamSelectT } from "@/db/schema/team";

export type ListScheduleT = {
    matchId: MatchSelectT["id"];
    gameWeek: MatchSelectT["gameWeek"];
    blueWon: MatchSelectT["blueWon"];
    blueTeamDefaultName: TeamSelectT["defaultName"];
    blueTeamName: TeamSelectT["teamName"];
    redTeamDefaultName: TeamSelectT["defaultName"];
    redTeamName: TeamSelectT["teamName"];
};

export const PlayerScheduleResultArk = type({
    summoner: "string > 0",
    position: PlayerPositionsArk,
    champion: championValidatorArk,
    kda: PlayerKdaArk.get("raw"),
});
export type PlayerScheduleResultT = typeof PlayerScheduleResultArk.infer;

export const ListScheduleArk = type({
    matchId: "number",
    gameWeek: "number > 0",
    blueWon: "boolean | null",
    blueTeamDefaultName: "string > 0",
    blueTeamName: "string | null",
    redTeamDefaultName: "string > 0",
    redTeamName: "string | null",
});

const DateStringArk = type("string.date | null").pipe((s) =>
    s ? new Date(s) : null,
);

export const PlayedMatchDetailsArk = type({
    "...": ListScheduleArk,
    gameTimeSeconds: "number.integer >= 0",
    matchDate: DateStringArk,
    blueTeamPlayers: PlayerScheduleResultArk.array(),
    redTeamPlayers: PlayerScheduleResultArk.array(),
});
export type PlayedMatchDetailsT = typeof PlayedMatchDetailsArk.infer;
