"use client";

import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/cn";
import {
    Bar,
    CartesianGrid,
    Cell,
    BarChart as RechartsBarChart,
    XAxis,
    YAxis,
} from "recharts";

// type imports
import type { BasePositionDataT } from "../types";

export interface BarChartProps<T extends BasePositionDataT> {
    className?: string;
    chartConfig?: ChartConfig;
    data: T[];
    tooltipLabel: string;
    dataKey: keyof T extends string ? keyof T : never;
}

export default function BarChart<DataT extends BasePositionDataT>({
    className,
    chartConfig = {},
    data,
    tooltipLabel,
    dataKey,
}: BarChartProps<DataT>) {
    return (
        <ChartContainer
            config={chartConfig}
            className={cn(
                "min-h-[200px] w-full h-full [&_.recharts-cartesian-axis-tick_text]:fill-black dark:[&_.recharts-cartesian-axis-tick_text]:fill-slate-200",
                className,
            )}
        >
            <RechartsBarChart accessibilityLayer data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis />
                <XAxis
                    dataKey="gameWeek"
                    className="text-black"
                    tickLine={false}
                    tickMargin={10}
                    fill="black"
                    axisLine={false}
                />
                <ChartTooltip
                    label={tooltipLabel}
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            label={tooltipLabel}
                            hideIndicator
                        />
                    }
                />
                <Bar dataKey={dataKey} label barSize={100}>
                    {Array.from({ length: data.length })
                        .fill(null)
                        .map((_, idx) => (
                            <Cell
                                // biome-ignore lint/suspicious/noArrayIndexKey: sucks
                                key={`pie-cell-${idx}`}
                                fill={`var(--color-chart-${(idx % 4) + 1})`}
                            />
                        ))}
                </Bar>
                <ChartLegend
                    content={
                        <ChartLegendContent
                            payload={data.map(({ position }) => ({
                                dataKey: position,
                                value: position,
                            }))}
                        />
                    }
                />
            </RechartsBarChart>
        </ChartContainer>
    );
}
