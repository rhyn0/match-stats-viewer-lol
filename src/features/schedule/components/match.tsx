"use client";

import { TypoH4 } from "@/components/typography/headings";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import type { ListScheduleT } from "../types";

interface MatchProps
    extends Omit<
        ListScheduleT,
        | "gameWeek"
        | "blueTeamDefaultName"
        | "blueTeamName"
        | "redTeamName"
        | "redTeamDefaultName"
    > {
    blueTeam: string;
    redTeam: string;
    className?: string;
}

export default function Match({
    blueTeam,
    blueWon,
    redTeam,
    className,
}: MatchProps) {
    const [showResult, setShowResult] = React.useState<boolean>(false);

    const matchPlayed = blueWon !== null;
    const toggleResult = React.useCallback(() => {
        if (matchPlayed) {
            setShowResult((prev) => !prev);
        }
    }, [matchPlayed]);
    return (
        <div
            className={cn(
                "bg-secondary rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out",
                { "hover:shadow-lg": matchPlayed },
                className,
            )}
        >
            <div className="p-4 flex justify-between items-center">
                <div className="grow">
                    <div className="grid items-center mb-2">
                        {matchPlayed ? (
                            <Button
                                onClick={toggleResult}
                                variant="ghost"
                                className="text-blue-500 hover:text-blue-700 transition-colors duration-200 justify-self-end"
                                aria-label={
                                    showResult ? "Hide result" : "Show result"
                                }
                            >
                                {showResult ? (
                                    <Eye size={20} />
                                ) : (
                                    <EyeOff size={20} />
                                )}
                            </Button>
                        ) : (
                            <TypoH4 className="justify-self-center text-center underline underline-offset-4 font-light">
                                To be Played Soon!
                            </TypoH4>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-lg">{blueTeam}</p>
                        <p className="font-semibold text-lg">vs</p>
                        <p className="font-semibold text-lg">{redTeam}</p>
                    </div>
                </div>
            </div>
            {matchPlayed && (
                <div
                    className={`bg-secondary p-4 transition-all duration-300 ease-in-out
                      ${showResult ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
                >
                    <p className="font-semibold text-center">
                        Result:{" "}
                        <span className={showResult ? "" : "blur-sm"}>
                            {`${blueWon ? blueTeam : redTeam} Won!`}
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}
