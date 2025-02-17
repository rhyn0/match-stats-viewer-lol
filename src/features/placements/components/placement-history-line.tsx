"use client";
import { TypoH1 } from "@/components/typography/headings";
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/cn";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Skull } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { getTeamPlacementProbQueryOptions } from "../api/get-placement-prob";

import React from "react";
// type imports
import type { PlacementProbT } from "../types";

const chartConfig = {
    "1": {
        color: "#ffd700",
        label: "1st",
    },
    "2": {
        color: "#c0c0c0",
        label: "2nd",
    },
    "3": {
        color: "#cd7f32",
        label: "3rd",
    },
    "4": {
        color: "#1e90ff",
        label: "4th",
    },
    "5": {
        color: "#32cd32",
        label: "5th",
    },
    "6": {
        color: "#ff4500",
        label: "6th",
    },
    "7": {
        color: "#8a2be2",
        label: "7th",
    },
    "8": {
        color: "#ff69b4",
        label: "8th",
    },
    "9": {
        color: "#00ced1",
        label: "9th",
    },
    "10": {
        color: "#ffa500",
        label: "10th",
    },
    "11": {
        color: "#808080",
        label: "11th",
    },
} satisfies ChartConfig;

type TransformedTeamProbT = {
    [key: `${number}`]: number;
    dateCreated: string;
};
function selectTransformTeamProbs(
    data: PlacementProbT[],
): TransformedTeamProbT[] {
    const groupedStandings = data.reduce<Map<string, Record<string, number>>>(
        (acc, standingEntry) => {
            const localeDate = standingEntry.dateCreated.toLocaleDateString();
            if (acc.has(localeDate)) {
                // @ts-expect-error - dumbest error
                acc.get(localeDate)[standingEntry.standing] =
                    standingEntry.probability;
            } else {
                acc.set(localeDate, {
                    [standingEntry.standing]: standingEntry.probability,
                });
            }

            return acc;
        },
        new Map(),
    );
    const defaultStanding = Array(11)
        .fill(null)
        .reduce((acc, _p, idx) => {
            acc[idx] = 0;
            return acc;
        }, {});
    groupedStandings.set("1/25/2025", defaultStanding);
    const result = Array.from(
        groupedStandings.entries().map(([localeDate, standings]) => ({
            ...standings,
            dateCreated: localeDate,
        })),
    );
    return result.sort(
        // @ts-expect-error - need the date sorting
        (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated),
    );
}

export interface LineChartProps {
    className?: string;
    teamId: number;
    // teamName: string;
}
export default function PlacementLineChart({
    className,
    teamId,
}: LineChartProps) {
    const { data, isError } = useSuspenseQuery({
        ...getTeamPlacementProbQueryOptions(teamId),
        select: selectTransformTeamProbs,
    });

    const uniquePlacements = React.useMemo(
        () =>
            Array.from(
                data.reduce((acc, prob) => {
                    for (const key of Object.keys(prob)) {
                        if (key === "dateCreated") continue;
                        acc.add(key);
                    }
                    return acc;
                }, new Set<string>()),
            ),
        [data],
    );

    if (isError) {
        return (
            <div>
                <TypoH1>Woops, an error occurred.</TypoH1>
                <Skull />
            </div>
        );
    }

    return (
        <ChartContainer
            config={chartConfig}
            className={cn(
                "min-h-[200px] w-full h-full [&_.recharts-cartesian-axis-tick_text]:fill-black dark:[&_.recharts-cartesian-axis-tick_text]:fill-slate-200",
                className,
            )}
        >
            <LineChart
                accessibilityLayer
                data={data}
                width={500}
                height={300}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="currentColor"
                    className="dark:text-slate-400 text-slate-600"
                />
                <YAxis
                    label={{
                        value: "Percentage Odds of Ending at Standing",
                        angle: -90,
                        position: "insideLeft",
                    }}
                />
                <XAxis
                    dataKey="dateCreated"
                    className="text-black"
                    tickLine={false}
                    tickMargin={10}
                    fill="black"
                    axisLine={false}
                    label="Date Calculated"
                />
                <ChartTooltip content={<ChartTooltipContent />} />

                {uniquePlacements.map((place) => (
                    <Line
                        key={place}
                        dataKey={place}
                        type="monotone"
                        stroke={`var(--color-${place})`}
                        fill={`var(--color-${place})`}
                    />
                ))}
                <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
        </ChartContainer>
    );
}
