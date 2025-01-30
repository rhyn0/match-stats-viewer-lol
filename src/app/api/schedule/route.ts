import { listMatchesWithTeams } from "@/lib/crud/matchups";
import db from "@/lib/drizzle-db";
import { NextResponse } from "next/server";

export const revalidate = 3600 * 2; // 2 hour in seconds

export async function GET(): Promise<NextResponse> {
    const result = await listMatchesWithTeams(db);
    return NextResponse.json({ data: result });
}
