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

export const ListScheduleArk = type({
    matchId: "number",
    gameWeek: "number > 0",
    blueWon: "boolean | null",
    blueTeamDefaultName: "string > 0",
    blueTeamName: "string | null",
    redTeamDefaultName: "string > 0",
    redTeamName: "string | null",
});
