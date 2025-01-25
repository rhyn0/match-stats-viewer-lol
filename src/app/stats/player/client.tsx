"use client";

import { TypoH2 } from "@/components/typography/headings";
import { Spinner } from "@/components/ui/spinner";
import PlayerStatTable from "@/features/stats-player/components/table";
import useListPlayerStatsQuery from "@/features/stats-player/hooks/use-list-player-stats";

export default function PlayerStatsClient() {
    const allPlayerStatsQuery = useListPlayerStatsQuery();
    if (allPlayerStatsQuery.isPending) {
        return <Spinner size="lg" />;
    }

    if (allPlayerStatsQuery.isError) {
        return (
            <div>
                <TypoH2>Error {allPlayerStatsQuery.error?.message}</TypoH2>
            </div>
        );
    }
    return <PlayerStatTable data={allPlayerStatsQuery.data} />;
}
