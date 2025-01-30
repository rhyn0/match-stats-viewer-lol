"use client";

import { TypoH2 } from "@/components/typography/headings";
import React from "react";
import useListScheduleQuery from "../hooks/use-list-schedule";
import Match from "./match";

// type iports
import type { ListScheduleReturnT } from "../api/list-schedule";
import type { ListScheduleT } from "../types";

/**
 *
 * @param data The schedule gotten from server
 * @returns An order array of tuples for the weeks and their matches
 */
function groupByWeek(data: ListScheduleReturnT): [number, ListScheduleT[]][] {
    return Array.from(
        Object.entries(
            data.reduce<Record<number, ListScheduleT[]>>((acc, match) => {
                acc[match.gameWeek] = [...(acc[match.gameWeek] ?? []), match];
                return acc;
            }, {}),
        ),
    ).map(([key, matches]) => [Number.parseInt(key), matches]);
}

export default function MatchList() {
    const scheduleSuspenseQuery = useListScheduleQuery();
    const grouped = React.useMemo(
        () => groupByWeek(scheduleSuspenseQuery.data),
        [scheduleSuspenseQuery.data],
    );
    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            {grouped.map(([weekNum, matches]) => (
                <section key={weekNum}>
                    <TypoH2 className="text-center mb-2">Week {weekNum}</TypoH2>
                    <div className="space-y-4">
                        {matches.map((match) => (
                            <Match
                                key={match.matchId}
                                blueWon={match.blueWon}
                                blueTeam={
                                    match.blueTeamName ??
                                    match.blueTeamDefaultName
                                }
                                redTeam={
                                    match.redTeamName ??
                                    match.redTeamDefaultName
                                }
                                matchId={match.matchId}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
