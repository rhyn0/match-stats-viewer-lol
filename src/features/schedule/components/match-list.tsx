"use client";

import { TypoH2 } from "@/components/typography/headings";
import React from "react";
import useListScheduleQuery from "../hooks/use-list-schedule";
import Match from "./match";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
// type iports
import type { ListScheduleReturnT } from "../api/list-schedule";
import type { ListScheduleT } from "../types";

type GroupWeekReturnT = {
    key: string;
    matches: ListScheduleT[];
    scrollToRef: boolean;
};
/**
 *
 * @param data The schedule gotten from server
 * @returns An order array of tuples for the weeks and their matches
 */
function groupByWeek(data: ListScheduleReturnT): GroupWeekReturnT[] {
    const rv: Record<number, Omit<GroupWeekReturnT, "key">> = {};
    let foundRef = false;
    for (const match of data) {
        const prev = rv[match.gameWeek] as
            | Omit<GroupWeekReturnT, "key">
            | undefined;
        const scrollToRef =
            prev?.scrollToRef || (match.blueWon === null && !foundRef);
        if (scrollToRef) {
            foundRef = true;
        }
        rv[match.gameWeek] = {
            ...(prev ?? {}),
            matches: [...(prev?.matches ?? []), match],
            scrollToRef,
        };
    }
    return Array.from(Object.entries(rv)).map(([id, value]) => ({
        ...value,
        key: id,
    }));
}

export default function MatchList() {
    const unplayedWeekRef = React.useRef<HTMLElement>(null);
    const scheduleSuspenseQuery = useListScheduleQuery();
    const grouped = React.useMemo(
        () => groupByWeek(scheduleSuspenseQuery.data),
        [scheduleSuspenseQuery.data],
    );
    return (
        <div>
            <Button
                variant="outline"
                type="button"
                aria-label="Scroll to Next Unplayed"
                onClick={() => unplayedWeekRef.current?.scrollIntoView()}
                className="fixed bottom-auto top-32 right-8 p-1 bg-accent text-white text-lg rounded-md shadow-md hover:bg-blue-600 focus:outline-none z-50 size-10 [&_svg]:size-fit"
            >
                <span className="sr-only">Scroll to Next Unplayed</span>
                <ChevronDown
                    className="size-12 text-accent-foreground"
                    height={undefined}
                    width={undefined}
                />
            </Button>
            <div className="space-y-8 max-w-2xl mx-auto">
                {grouped.map(({ key, matches, scrollToRef }) => (
                    <section
                        key={key}
                        ref={scrollToRef ? unplayedWeekRef : null}
                    >
                        <TypoH2 className="text-center mb-2">Week {key}</TypoH2>
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
        </div>
    );
}
