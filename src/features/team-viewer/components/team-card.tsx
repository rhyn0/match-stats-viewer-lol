import PositionAvatar from "@/components/avatar-position";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { multiOpGgUrl } from "@/lib/build-opgg";
import { cn } from "@/lib/cn";
import sortByPosition from "@/lib/sort-by-position";
import React from "react";

// type imports
import type { TeamT } from "../types";

interface TeamCardProps {
    team: TeamT;
    className?: string;
}

function TeamCard({
    team,
    className,
    children,
}: React.PropsWithChildren<TeamCardProps>) {
    const name = team.teamName ?? team.defaultName;
    const sortedPlayers = React.useMemo(() => {
        return sortByPosition(team.players);
    }, [team]);
    const multiOpGg = React.useMemo(
        () => multiOpGgUrl(sortedPlayers.map((p) => p.summonerName)),
        [sortedPlayers],
    );
    return (
        <Card className={cn("w-full", className)}>
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    {name}
                </CardTitle>
                <CardDescription>
                    <a
                        href={multiOpGg.toString()}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-300 underline"
                    >
                        OP.GG for {name}
                    </a>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedPlayers.map((player) => (
                    <PlayerLine key={player.id} player={player} />
                ))}
            </CardContent>
            <CardFooter>{children}</CardFooter>
        </Card>
    );
}

function PlayerLine({ player }: { player: TeamT["players"][0] }) {
    return (
        <div className="flex items-center space-x-4 p-2 rounded-lg bg-secondary">
            <PositionAvatar fallbackClassName="uppercase">
                {player.designatedPosition[0]}
            </PositionAvatar>

            <div className="min-w-0 flex-1">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <p className="text-sm font-medium leading-none truncate">
                                {player ? player.name : "TBA"}
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{player ? player.name : "To Be Announced"}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <p className="text-sm text-muted-foreground capitalize">
                    {player.designatedPosition}
                </p>
            </div>
        </div>
    );
}

export default TeamCard;
