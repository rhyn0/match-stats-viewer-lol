import { TypoH1 } from "@/components/typography/headings";
import MatchList from "@/features/schedule/components/match-list";
import React from "react";
import MatchListFallback from "./page-loading";

export default function Schedule() {
    return (
        <main>
            <TypoH1 className="text-center mb-8 font-bangers tracking-wide">
                Schedule
            </TypoH1>
            <React.Suspense fallback={<MatchListFallback />}>
                <MatchList />
            </React.Suspense>
        </main>
    );
}
