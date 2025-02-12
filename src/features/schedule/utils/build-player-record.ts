import type { PlayerScheduleResultT } from "../types";

const playerRegex = /(\S+#.{3,5}) \((.+)\)/;

function buildPlayerScheduleRecord(
    team: string | null,
): PlayerScheduleResultT[] {
    if (team === null) {
        return [];
    }
    return team.split(",").map((el) => {
        const match = el.match(playerRegex);
        if (!match) {
            throw new Error("NO WAY THIS HAPPENS");
        }
        const [position, champion, kda] = match[2].split(" - ");
        return {
            summoner: match[1],
            position,
            champion,
            kda,
        } as PlayerScheduleResultT;
    });
}

export default buildPlayerScheduleRecord;
