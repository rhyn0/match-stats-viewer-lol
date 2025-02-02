"use client";

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/cn";
import React from "react";
import { Cell, Pie, PieChart as RechartPieChart } from "recharts";

// type imports
import type { BaseWeeklyDataT } from "../types";

const RADIAN = Math.PI / 180;
function renderCustomizedLabel(props: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
}) {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            className="fill-black"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
}

export interface PieChartProps<T extends BaseWeeklyDataT> {
    className?: string;
    chartConfig?: ChartConfig;
    data: T[];
    dataKey: keyof T extends string ? string : never;
    sectionName: string;
}
export default function PieChart<DataT extends BaseWeeklyDataT>({
    className,
    chartConfig = {},
    data,
    dataKey,
    sectionName,
}: PieChartProps<DataT>) {
    const labelFormatter = React.useCallback(
        // biome-ignore lint/suspicious/noExplicitAny: library type
        (_x: any, item: any) => `Week ${item[0].payload.gameWeek}`,
        [],
    );

    return (
        <ChartContainer
            config={chartConfig}
            className={cn("min-h-[200px] w-full", className)}
        >
            <RechartPieChart accessibilityLayer height={400} width={400}>
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            labelKey="gameWeek"
                            hideIndicator
                            labelFormatter={labelFormatter}
                        />
                    }
                />
                <Pie
                    animationDuration={500}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={renderCustomizedLabel}
                    dataKey={dataKey}
                >
                    {data.map((_, idx) => (
                        <Cell
                            name={sectionName}
                            // biome-ignore lint/suspicious/noArrayIndexKey: sucks
                            key={`pie-cell-${idx}`}
                            fill={`var(--color-chart-${(idx % 4) + 1})`}
                        />
                    ))}
                </Pie>
            </RechartPieChart>
        </ChartContainer>
    );
}
