"use client";
import { TypoH3 } from "@/components/typography/headings";
import PlacementLineChart from "@/features/placements/components/placement-history-line";
import TeamPickerSelect from "@/features/placements/components/team-picker";
import { cn } from "@/lib/cn";
import React from "react";

export interface ClientPlacementsProps {
    className?: string;
}

export default function ClientPlacements({ className }: ClientPlacementsProps) {
    const [teamId, setTeamId] = React.useState<number | null>(null);
    const handleTeamSelect = React.useCallback(
        (val: string) => setTeamId(Number.parseInt(val)),
        [],
    );

    return (
        <section
            className={cn(
                "mx-10 justify-items-center justify-self-center",
                className,
            )}
        >
            <div className="inline-flex flex-row gap-8 mx-auto items-center justify-evenly">
                <TypoH3>Choose a Team to View</TypoH3>
                <TeamPickerSelect onChange={handleTeamSelect} />
            </div>

            {teamId !== null ? (
                <div className="m-10 w-full h-2/3">
                    <PlacementLineChart teamId={teamId} />
                </div>
            ) : null}
        </section>
    );
}
