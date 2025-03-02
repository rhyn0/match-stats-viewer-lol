"use client";
import { TypoH1 } from "@/components/typography/headings";
import { PlayoffPredictionForm } from "@/features/playoff-predict/components/prediction-form";
import usePlayoffPredictionsQuery from "@/features/playoff-predict/hooks/use-get-playoff-predictions";
import usePlayoffMatchesQuery from "@/features/playoff-predict/hooks/use-list-playoff-matches";
import usePlayoffTeamsQuery from "@/features/playoff-predict/hooks/use-list-playoff-teams";
import { buildBracket } from "@/features/playoff-predict/lib/matchup-builder";
import type { Match } from "@/features/playoff-predict/types";
import React from "react";

export default function PlayoffPage() {
    const teamsQuery = usePlayoffTeamsQuery();
    const matchesQuery = usePlayoffMatchesQuery();
    const predictionsQuery = usePlayoffPredictionsQuery();
    const bracket = React.useMemo<Match[]>(
        () => buildBracket(teamsQuery.data, matchesQuery.data),
        [teamsQuery.data, matchesQuery.data],
    );
    return (
        <main>
            <TypoH1 className="text-center mb-8 font-bangers tracking-wide">
                Playoff Brackets
            </TypoH1>
            <PlayoffPredictionForm
                className="mx-auto"
                initialBracket={bracket}
                predictions={predictionsQuery.data}
            />
        </main>
    );
}
