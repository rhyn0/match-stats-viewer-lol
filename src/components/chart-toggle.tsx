"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { ChartBar, ChartPie } from "lucide-react";
import React from "react";

type PieBarT = "pie" | "bar";
const PieBarContext = React.createContext<{
    value: PieBarT;
    setter: (v: PieBarT) => void;
    // biome-ignore lint/suspicious/noEmptyBlockStatements: default
}>({ value: "pie", setter: () => {} });

export interface PieBarRootProps {
    defaultValue?: PieBarT;
    pieComponent: React.ReactNode;
    barComponent: React.ReactNode;
    className?: string;
}
export default function ChartToggleRoot({
    defaultValue,
    pieComponent,
    barComponent,
    className,
}: PieBarRootProps) {
    const [chartType, setChartType] = React.useState<PieBarT>(
        defaultValue ?? "pie",
    );
    return (
        <PieBarContext.Provider
            value={{ value: chartType, setter: setChartType }}
        >
            {chartType === "pie" ? pieComponent : barComponent}
            <ChartToggle className={className} />
        </PieBarContext.Provider>
    );
}
function ChartToggle({ className }: { className?: string }) {
    const { value, setter } = React.useContext(PieBarContext);
    return (
        <div className={cn("flex flex-row gap-0", className)}>
            <Button
                variant="outline"
                disabled={value === "pie"}
                onMouseDown={() => setter("pie")}
                size="icon"
            >
                <ChartPie />
            </Button>
            <Button
                variant="outline"
                disabled={value === "bar"}
                onMouseDown={() => setter("bar")}
                size="icon"
            >
                <ChartBar />
            </Button>
        </div>
    );
}
