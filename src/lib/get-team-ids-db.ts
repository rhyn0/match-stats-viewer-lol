import db from "./drizzle-db";

export async function getTeamIds(): Promise<number[]> {
    const queryRes = await db.query.teams.findMany({
        columns: {
            id: true,
        },
    });
    return queryRes.map(({ id }) => id);
}
