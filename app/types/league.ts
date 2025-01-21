import { type } from "arktype";

export const playerPositionOptions = [
    "top",
    "jgl",
    "mid",
    "bot",
    "sup",
] as const;

export const PlayerPositionsArk = type.enumerated(...playerPositionOptions);
export type PlayerPositionT = typeof PlayerPositionsArk.infer;

export const LeagueScope = type.scope({
    position: type.enumerated(...playerPositionOptions),
    positionMaybe: "position | null",
});
