import { getTeamIds } from "@/lib/get-team-ids-db";
import TeamIdCardClient from "./client";

export async function generateStaticParams() {
    const ids = await getTeamIds();
    return ids.map((id) => ({
        teamId: id.toString(),
    }));
}

export default async function RouteComponent({
    params,
}: {
    params: Promise<{ teamId: string }>;
}) {
    const teamIdParam = (await params).teamId;
    const teamId = Number.parseInt(teamIdParam);

    return <TeamIdCardClient teamId={teamId} />;
}
