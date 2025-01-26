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

export const UploadMatchArk = type({
    matchRecord: MatchRecordArk,
    isPlayoffs: "boolean",
    playerMatchRecords: PlayerMatchRecordArk.array(),
});
export type UploadMatchT = typeof UploadMatchArk.infer;

export const InputUploadMatchArk = type({
    "...": UploadMatchArk.omit("playerMatchRecords"),
    playerMatchRecords: InputPlayerMatchRecordArk.array(),
});
export type InputUploadMatchT = typeof InputUploadMatchArk.infer;
