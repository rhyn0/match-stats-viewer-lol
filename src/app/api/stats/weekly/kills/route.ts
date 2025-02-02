import { getTotalKillsByWeek } from "@/lib/crud/weekly-groupings";
import db from "@/lib/drizzle-db";
import { NextResponse } from "next/server";

export const revalidate = 7200; // 2 hours in seconds

export async function GET() {
    const result = await getTotalKillsByWeek(db);
    return NextResponse.json({ data: result });
}
