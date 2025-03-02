import { getPlayoffTeams } from "@/lib/crud/playoff-teams";
import db from "@/lib/drizzle-db";

export const revalidate = 10800; // 3 hour in seconds

export async function GET() {
    const data = await getPlayoffTeams(db);
    const condensedName = data.map(({ teamName, defaultName, ...rest }) => ({
        ...rest,
        name: teamName ?? defaultName,
    }));
    return Response.json({ data: condensedName });
}
