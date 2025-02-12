import { TypoH3 } from "@/components/typography/headings";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/cn";
import sortByPosition from "@/lib/sort-by-position";
import { Shield, Trophy } from "lucide-react";
import React from "react";
import useGetPlayedMatchQuery from "../hooks/use-get-match-details";

import type { PlayerScheduleResultT } from "../types";

type Team = {
    name: string;
    players: PlayerScheduleResultT[];
};

export interface LoLPostMatchProps {
    blueTeamName: string;
    redTeamName: string;
    matchId: string | number;
    blueWon: boolean;
    enabled?: boolean;
}

export default function LoLPostMatch({
    blueTeamName,
    redTeamName,
    matchId,
    blueWon,
    enabled = true,
}: LoLPostMatchProps) {
    const matchQuery = useGetPlayedMatchQuery({
        id: matchId,
        enabled: enabled,
    });
    if (matchQuery.isPending) {
        return (
            <div className="w-[300px] h-60 bg-secondary flex justify-center">
                <Spinner size="xl" />
            </div>
        );
    }

    if (matchQuery.isError) {
        return (
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <TypoH3>Failed to fetch data for this match. Sorry.</TypoH3>
                <div className="flex justify-between">
                    <WinnerHeader
                        name={blueTeamName}
                        isWinner={blueWon}
                        side="left"
                    />

                    <div className="text-4xl font-bold text-gray-500 self-center">
                        VS
                    </div>
                    <WinnerHeader
                        name={redTeamName}
                        isWinner={!blueWon}
                        side="right"
                    />
                </div>
            </div>
        );
    }

    const blueTeam: Team = {
        name: blueTeamName,
        players: matchQuery.data.blueTeamPlayers,
    };
    const redTeam: Team = {
        name: redTeamName,
        players: matchQuery.data.redTeamPlayers,
    };
    if (blueTeam.players.length < 5 || redTeam.players.length < 5) {
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <TypoH3>This match was a forfeit, no stats to display.</TypoH3>
            <div className="flex justify-between">
                <WinnerHeader
                    name={blueTeamName}
                    isWinner={blueWon}
                    side="left"
                />

                <div className="text-4xl font-bold text-gray-500 self-center">
                    VS
                </div>
                <WinnerHeader
                    name={redTeamName}
                    isWinner={!blueWon}
                    side="right"
                />
            </div>
        </div>;
    }
    return (
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6">
                Post Match Results
            </h1>
            <div className="grid grid-cols-5">
                <TeamBlock
                    team={blueTeam}
                    side="left"
                    isWinner={blueWon}
                    className="col-span-2"
                />
                <div className="text-4xl font-bold text-gray-500 justify-center items-center inline-flex">
                    VS
                </div>
                <TeamBlock
                    team={redTeam}
                    side="right"
                    isWinner={!blueWon}
                    className="col-span-2"
                />
            </div>
        </div>
    );
}

function TeamBlock({
    team,
    side,
    isWinner,
    className,
}: {
    team: Team;
    side: "left" | "right";
    isWinner: boolean;
    className?: string;
}) {
    const sortedPlayers = React.useMemo(() => {
        const designatedPositions = team.players.map((pl) => ({
            ...pl,
            designatedPosition: pl.position,
        }));
        return sortByPosition(designatedPositions);
    }, [team.players]);
    return (
        <div
            className={cn(
                "flex flex-col",
                side === "left" ? "items-start" : "items-end",
                className,
            )}
        >
            <WinnerHeader name={team.name} isWinner={isWinner} side={side} />
            {sortedPlayers.map((player) => (
                <div
                    key={player.summoner}
                    className={`flex items-center gap-2 mb-2 ${side === "right" ? "flex-row-reverse" : ""}`}
                >
                    <div className="w-24 truncate text-sm font-semibold">
                        {player.summoner}
                    </div>
                    <div className="w-24 text-sm text-gray-300">
                        {player.champion}
                    </div>
                    <div className="w-24 text-sm text-gray-300">
                        {player.kda}
                    </div>
                </div>
            ))}
        </div>
    );
}

function WinnerHeader({
    name,
    isWinner,
    side,
}: { name: string } & Pick<
    React.ComponentProps<typeof TeamBlock>,
    "isWinner" | "side"
>) {
    return (
        <div
            className={`flex items-center gap-2 mb-4 ${side === "right" && "flex-row-reverse"}`}
        >
            <Shield
                className={`h-6 w-6 ${isWinner ? "text-yellow-500" : "text-gray-400"}`}
            />
            <h2
                className={`text-2xl font-bold ${isWinner ? "text-yellow-500" : "text-white"}`}
            >
                {name}
            </h2>
            {isWinner && <Trophy className="h-6 w-6 text-yellow-500" />}
        </div>
    );
}
