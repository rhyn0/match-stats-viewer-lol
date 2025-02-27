"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Match = {
    id: number;
    teams: [string | null, string | null];
    winner: number | null;
};

const initialBracket: Match[] = [
    { id: 1, teams: ["Team 1", "Team 2"], winner: null },
    { id: 2, teams: ["Team 3", "Team 4"], winner: null },
    { id: 3, teams: ["Team 5", "Team 6"], winner: null },
    { id: 4, teams: ["Team 7", "Team 8"], winner: null },
    { id: 5, teams: [null, null], winner: null },
    { id: 6, teams: [null, null], winner: null },
    { id: 7, teams: [null, null], winner: null },
];

export default function TournamentBracket() {
    const [bracket, setBracket] = useState<Match[]>(initialBracket);

    const handleWinnerSelection = (matchId: number, winnerIndex: number) => {
        setBracket((prevBracket) => {
            const updatedBracket = [...prevBracket];
            const currentMatch = updatedBracket.find(
                (match) => match.id === matchId,
            );
            if (currentMatch) {
                currentMatch.winner = winnerIndex;

                // Update next match
                const nextMatchId =
                    matchId < 5 ? matchId + 4 : matchId === 5 ? 7 : 7;
                const nextMatch = updatedBracket.find(
                    (match) => match.id === nextMatchId,
                );
                if (nextMatch) {
                    const nextMatchTeamIndex = matchId % 2 === 1 ? 0 : 1;
                    nextMatch.teams[nextMatchTeamIndex] =
                        currentMatch.teams[winnerIndex];
                }
            }
            return updatedBracket;
        });
    };

    const renderMatch = (match: Match) => (
        <Card className="p-4 mb-4" key={match.id}>
            <div className="flex flex-col space-y-2">
                {match.teams.map((team, index) => (
                    <Button
                        key={index}
                        onClick={() => handleWinnerSelection(match.id, index)}
                        variant={match.winner === index ? "default" : "outline"}
                        className="justify-start"
                        disabled={!team}
                    >
                        {team || "TBD"}
                    </Button>
                ))}
            </div>
        </Card>
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Tournament Bracket</h1>
            <div className="flex justify-between">
                <div className="w-1/4">
                    <h2 className="text-lg font-semibold mb-2">
                        Quarter-finals
                    </h2>
                    {bracket.slice(0, 4).map(renderMatch)}
                </div>
                <div className="w-1/4">
                    <h2 className="text-lg font-semibold mb-2">Semi-finals</h2>
                    {bracket.slice(4, 6).map(renderMatch)}
                </div>
                <div className="w-1/4">
                    <h2 className="text-lg font-semibold mb-2">Final</h2>
                    {renderMatch(bracket[6])}
                </div>
            </div>
        </div>
    );
}
