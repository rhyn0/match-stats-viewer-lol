import { getPlacementProbsForTeam } from "@/lib/crud/historical-placements";
import db from "@/lib/drizzle-db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ teamId: string }> },
) {
    const teamIdStr = (await params).teamId;
    const teamId = Number.parseInt(teamIdStr);
    if (Number.isNaN(teamId) || teamId < 0) {
        return new NextResponse("Invalid teamId", { status: 400 });
    }
    const data = await getPlacementProbsForTeam(db, teamId);
    return NextResponse.json({ data });
}
