"use client";

import ChartToggleRoot from "@/components/chart-toggle";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import BarChart from "@/features/position-stats/components/bar-chart";
import PieChart from "@/features/position-stats/components/pie-chart";
import usePositionAssistsQuery from "@/features/position-stats/hooks/use-position-assists";
import usePositionDeathsQuery from "@/features/position-stats/hooks/use-position-deaths";
import usePositionKillsQuery from "@/features/position-stats/hooks/use-position-kills";

const barChartConfig = {
    totalKills: {
        label: "Kills",
    },
    totalDeaths: {
        label: "Deaths",
    },
    totalAssists: {
        label: "Assists",
    },
};

export default function ChartsClient() {
    const weeklyKillsQuery = usePositionKillsQuery();
    const weeklyDeathsQuery = usePositionDeathsQuery();
    const weeklyAssistsQuery = usePositionAssistsQuery();

    return (
        <div className="grid lg:grid-cols-2 lg:grid-rows-2 grid-flow-row">
            <Card className="relative">
                <CardHeader>
                    <CardTitle>Position Kills</CardTitle>
                    <CardDescription>
                        Number of kills per possible position.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartToggleRoot
                        defaultValue="bar"
                        pieComponent={
                            <PieChart
                                data={weeklyKillsQuery.data}
                                dataKey="totalKills"
                                sectionName="Kills"
                            />
                        }
                        barComponent={
                            <BarChart
                                chartConfig={barChartConfig}
                                dataKey="totalKills"
                                tooltipLabel="Kills for Position"
                                data={weeklyKillsQuery.data}
                            />
                        }
                        className="absolute top-2 right-2 left-auto bottom-auto"
                    />
                </CardContent>
            </Card>
            <Card className="relative">
                <CardHeader>
                    <CardTitle>Position Deaths</CardTitle>
                    <CardDescription>
                        Number of deaths per possible position.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartToggleRoot
                        defaultValue="bar"
                        pieComponent={
                            <PieChart
                                data={weeklyDeathsQuery.data}
                                dataKey="totalDeaths"
                                sectionName="Deaths"
                            />
                        }
                        barComponent={
                            <BarChart
                                chartConfig={barChartConfig}
                                dataKey="totalDeaths"
                                tooltipLabel="Deaths this Position"
                                data={weeklyDeathsQuery.data}
                            />
                        }
                        className="absolute top-2 right-2 left-auto bottom-auto"
                    />
                </CardContent>
            </Card>
            <Card className="relative">
                <CardHeader>
                    <CardTitle>Position Assists</CardTitle>
                    <CardDescription>
                        Number of assists per possible position.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartToggleRoot
                        defaultValue="bar"
                        pieComponent={
                            <PieChart
                                data={weeklyAssistsQuery.data}
                                dataKey="totalAssists"
                                sectionName="Assists"
                            />
                        }
                        barComponent={
                            <BarChart
                                chartConfig={barChartConfig}
                                dataKey="totalAssists"
                                tooltipLabel="Assists this Position"
                                data={weeklyAssistsQuery.data}
                            />
                        }
                        className="absolute top-2 right-2 left-auto bottom-auto"
                    />
                </CardContent>
            </Card>
        </div>
    );
}
