import buildPlayerScheduleRecord from "@/features/schedule/utils/build-player-record";
import { getMatchDataByMatchId } from "@/lib/crud/matchups";
import db from "@/lib/drizzle-db";
import { type NextRequest, NextResponse } from "next/server";

export const revalidate = 10800; // 3 hour in seconds

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ matchId: string }> },
): Promise<NextResponse> {
    const id = (await params).matchId;
    const matchId = Number.parseInt(id);
    if (Number.isNaN(matchId)) {
        return new NextResponse("Not Found", { status: 404 });
    }
    const result = await getMatchDataByMatchId(db, matchId);
    if (result.length === 0) {
        return new NextResponse("Not Found", { status: 404 });
    }
    const data = {
        ...result[0],
        blueTeamPlayers: buildPlayerScheduleRecord(result[0].blueTeamPlayers),
        redTeamPlayers: buildPlayerScheduleRecord(result[0].redTeamPlayers),
    };
    return NextResponse.json({ data });
}
