import { PlayerPositionsArk } from "@/types/league";
import { type } from "arktype";

export const PlayerKdaArk = type({
    raw: /^\d{1,2}\/\d{1,2}\/\d{1,2}/,
    kills: "number.integer >= 0",
    deaths: "number.integer >= 0",
    assists: "number.integer >= 0",
});
export type PlayerKdaT = typeof PlayerKdaArk.infer;
export type RawKdaT = PlayerKdaT["raw"];

export const PlayerMatchRecordArk = type({
    playerName: "string",
    championName: "string",
    position: PlayerPositionsArk,
    kda: PlayerKdaArk,
});
export type PlayerMatchRecordT = typeof PlayerMatchRecordArk.infer;

export const InputPlayerMatchRecordArk = type({
    "...": PlayerMatchRecordArk.omit("kda"),
    kda: PlayerKdaArk.pick("raw"),
});

export const MatchRecordArk = type({
    blueTeamName: "string > 0",
    redTeamName: "string > 0",
    blueWon: "boolean",
    gameTimeSeconds: "number.integer > 0",
    playDate: "Date",
});
export type MatchRecordT = typeof MatchRecordArk.infer;

export const BansArk = type({
    1: "string",
    2: "string",
    3: "string",
    4: "string",
    5: "string",
});
export type BansT = typeof BansArk.infer;

export const UploadMatchArk = type({
    matchRecord: MatchRecordArk,
    isPlayoffs: "boolean",
    playerMatchRecords: PlayerMatchRecordArk.array(),
    blueBans: BansArk,
    redBans: BansArk,
    blueTotalKills: "number >= 0",
    redTotalKills: "number >= 0",
});
export type UploadMatchT = typeof UploadMatchArk.infer;

export const InputUploadMatchArk = type({
    "...": UploadMatchArk.omit(
        "playerMatchRecords",
        "blueTotalKills",
        "redTotalKills",
    ),
    matchRecord: {
        "...": UploadMatchArk.get("matchRecord"),
        gameTimeSeconds: /^\d{1,3}:\d{2}/,
    },
    playerMatchRecords: InputPlayerMatchRecordArk.array(),
});
export type InputUploadMatchT = typeof InputUploadMatchArk.infer;
