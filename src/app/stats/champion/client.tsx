"use client";

import { TypoH2 } from "@/components/typography/headings";
import { TypoP } from "@/components/typography/text";
import { Spinner } from "@/components/ui/spinner";
import ChampionPresenceTable from "@/features/champion-presence/components/table";
import useChampionPresenceQuery from "@/features/champion-presence/hooks/use-list-champion-presence";

export default function ClientTable() {
    const championPresenceQuery = useChampionPresenceQuery();
    if (championPresenceQuery.isPending) {
        return <Spinner size="lg" />;
    }

    if (championPresenceQuery.isError) {
        return (
            <div>
                <TypoH2>Error {championPresenceQuery.error?.message}</TypoH2>
            </div>
        );
    }

    if (championPresenceQuery.data.length === 0) {
        return (
            <div>
                <TypoH2>No Presence Data at this time</TypoH2>
                <TypoP>Check back later.</TypoP>
            </div>
        );
    }

    return <ChampionPresenceTable data={championPresenceQuery.data} />;
}
