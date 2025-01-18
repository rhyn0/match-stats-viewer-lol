import { type } from "arktype";

export const playerPositionOptions = [
    "top",
    "jgl",
    "mid",
    "bot",
    "sup",
] as const;
export const PlayerPositionsSchema = type.enumerated(...playerPositionOptions);
export type PlayerPositionT = typeof PlayerPositionsSchema.infer;
