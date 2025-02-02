"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import BarChart from "@/features/weekly-stats/components/bar-chart";
import ChartToggleRoot from "@/features/weekly-stats/components/chart-toggle";
import PieChart from "@/features/weekly-stats/components/pie-chart";
import useWeeklyAssistStatsQuery from "@/features/weekly-stats/hooks/use-weekly-assists";
import useWeeklyDeathStatsQuery from "@/features/weekly-stats/hooks/use-weekly-deaths";
import useWeeklyKillStatsQuery from "@/features/weekly-stats/hooks/use-weekly-kills";

export default function ChartsClient() {
    const weeklyKillsQuery = useWeeklyKillStatsQuery();
    const weeklyDeathsQuery = useWeeklyDeathStatsQuery();
    const weeklyAssistsQuery = useWeeklyAssistStatsQuery();

    return (
        <div className="grid lg:grid-cols-2 lg:grid-rows-2 grid-flow-row">
            <Card className="relative">
                <CardHeader>
                    <CardTitle>Weekly Kills</CardTitle>
                    <CardDescription>
                        Number of kills per planned match week.
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
                                dataKey="totalKills"
                                tooltipLabel="Kills this Week"
                                data={weeklyKillsQuery.data}
                            />
                        }
                        className="absolute top-2 right-2 left-auto bottom-auto"
                    />
                </CardContent>
            </Card>
            <Card className="relative">
                <CardHeader>
                    <CardTitle>Weekly Deaths</CardTitle>
                    <CardDescription>
                        Number of deaths per planned match week.
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
                                dataKey="totalDeaths"
                                tooltipLabel="Deaths this Week"
                                data={weeklyDeathsQuery.data}
                            />
                        }
                        className="absolute top-2 right-2 left-auto bottom-auto"
                    />
                </CardContent>
            </Card>
            <Card className="relative">
                <CardHeader>
                    <CardTitle>Weekly Assists</CardTitle>
                    <CardDescription>
                        Number of assists per planned match week.
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
                                dataKey="totalAssists"
                                tooltipLabel="Assists this Week"
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
