"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import React from "react";
import { handleMatchWinner } from "../lib/matchup-builder";
import type { AggregatedPredictionsT, Match } from "../types";

export interface TournamentBracketProps {
    className?: string;
    disabled?: boolean;
    bracket: Match[];
    onChange: (newState: Match[]) => void;
    predictions: AggregatedPredictionsT[];
    ref: React.Ref<HTMLDivElement>;
}
export default function TournamentBracket({
    className,
    disabled = false,
    bracket,
    onChange,
    predictions,
    ref,
}: TournamentBracketProps) {
    const handleWinnerSelection = React.useCallback(
        (matchId: number, winnerIndex: 0 | 1) => {
            onChange(handleMatchWinner(bracket, matchId, winnerIndex));
        },
        [bracket, onChange],
    );

    return (
        <div
            className={cn(
                "flex flex-col md:flex-row justify-between",
                className,
            )}
            ref={ref}
        >
            <div className="w-full md:w-1/4">
                <h2 className="text-lg font-semibold mb-2">Quarter-finals</h2>
                {bracket.slice(0, 4).map((m) => (
                    <MatchCard
                        disabled={disabled}
                        key={m.id}
                        match={m}
                        onClick={(index) => handleWinnerSelection(m.id, index)}
                        odds={predictions[m.id - 1]}
                    />
                ))}
            </div>
            <div className="w-full md:w-1/4">
                <h2 className="text-lg font-semibold mb-2">Semi-finals</h2>
                {bracket.slice(4, 6).map((m) => (
                    <MatchCard
                        key={m.id}
                        disabled={disabled}
                        match={m}
                        onClick={(index) => handleWinnerSelection(m.id, index)}
                        odds={undefined}
                    />
                ))}
            </div>
            <div className="w-full md:w-1/4">
                <h2 className="text-lg font-semibold mb-2">Final</h2>
                <MatchCard
                    key={bracket[6].id}
                    disabled={disabled}
                    match={bracket[6]}
                    onClick={(index) =>
                        handleWinnerSelection(bracket[6].id, index)
                    }
                    odds={undefined}
                />
            </div>
        </div>
    );
}

function MatchCard({
    match,
    onClick,
    disabled,
    odds,
}: {
    match: Match;
    onClick: (winnerIndex: 0 | 1) => void;
    disabled: boolean;
    odds: AggregatedPredictionsT | undefined;
}) {
    const validMatch = match.teams.every((t) => t !== null);
    return (
        <Card className="p-4 mb-4">
            <div className="flex flex-col space-y-2">
                {match.locked ? (
                    <h5 className="scroll-m-20 text-lg font-medium tracking-tight">
                        Match Played
                    </h5>
                ) : null}
                {match.teams.map((team, index) => (
                    <Button
                        key={`${match.id}-${team?.id ?? -index}`}
                        onClick={() => onClick(index as 0 | 1)}
                        variant={match.winner === index ? "default" : "outline"}
                        className="justify-between data-[decided=true]:opacity-100"
                        disabled={!team || match.locked || disabled}
                        type="button"
                        data-decided={match.locked}
                    >
                        <span className="md:max-w-36 truncate">
                            {team?.name || "TBD"}
                        </span>
                        {odds !== undefined && validMatch && (
                            <span className="ml-2 text-sm bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                                {`${Math.round((index === 0 ? odds.blueWinOdds : odds.redWinOdds) * 100)}%`}
                            </span>
                        )}
                    </Button>
                ))}
            </div>
        </Card>
    );
}
