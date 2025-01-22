import { LeagueScope } from "@/types";
import { PlayerArk } from "@/types/player";
import { type } from "arktype";

const TeamPlayerArk = LeagueScope.type({
    "...": PlayerArk.omit("teamId"),
    designatedPosition: "position",
});

export const TeamArk = type({
    id: "number",
    defaultName: "string",
    teamName: "string | null",
    players: TeamPlayerArk.array(),
});

export type TeamT = typeof TeamArk.infer;
