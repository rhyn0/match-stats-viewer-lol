import { getTeamIds } from "@/lib/get-team-ids-db";
import React from "react";
import TeamIdCardClient from "./client";
import LoadingTeamPage from "./page-loading";

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

    return (
        <main className="flex min-h-full flex-col items-center justify-center p-8 space-y-10">
            <React.Suspense fallback={<LoadingTeamPage />}>
                <TeamIdCardClient teamId={teamId} />
            </React.Suspense>
        </main>
    );
}
