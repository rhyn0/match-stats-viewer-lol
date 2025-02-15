"use client";
import { TypoH2 } from "@/components/typography/headings";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React from "react";
import useListStandingsQuery from "../hooks/use-list-standings";
import calculateRanks from "../utils/calculate-rank";

import type { RankedTeamStandingsT } from "../types";

export interface TournamentStandingsProps {
    className?: string;
}
export default function TournamentStandings({
    className,
}: TournamentStandingsProps) {
    const standingsQuery = useListStandingsQuery();
    const standings = React.useMemo(
        () => calculateRanks(standingsQuery.data),
        [standingsQuery.data],
    );
    if (standingsQuery.isError) {
        return <TypoH2>An Error occurred</TypoH2>;
    }
    return (
        <Table className={className}>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Rank</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-right">Wins</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {standings.map((team) => (
                    <TableRow
                        key={team.rank}
                        className="nth-8:border-red-500 nth-8:border-b-2"
                    >
                        <TableCell className="font-medium">
                            {team.rank}
                        </TableCell>
                        <TableCell>
                            {team.teamName ?? team.teamDefaultName}
                        </TableCell>
                        <TableCell className="text-right">
                            {formatRecord(team)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function formatRecord(team: RankedTeamStandingsT): string {
    return `${team.win} - ${team.loss}`;
}
