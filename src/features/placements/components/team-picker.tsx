"use client";
import { TypoH3 } from "@/components/typography/headings";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import useListTeamsQuery from "@/features/team-viewer/hooks/use-list-teams";
import { cn } from "@/lib/cn";

export interface TeamPickerSelectProps {
    onChange: (val: string) => void;
    className?: string;
}

export default function TeamPickerSelect({
    className,
    onChange,
}: TeamPickerSelectProps) {
    const {
        data: teams,
        isError,
        isPending,
    } = useListTeamsQuery({
        staleTime: 1000 * 60 * 60 * 3, // 3 hours
    });
    if (isPending) {
        return (
            <div className="h-10 px-4 py-2">
                <Spinner size="lg" />
            </div>
        );
    }
    if (isError) {
        return <TypoH3>Blame ryan for this failing</TypoH3>;
    }

    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className={cn("w-[180px]", className)}>
                <SelectValue placeholder="Team To View" />
            </SelectTrigger>
            <SelectContent>
                {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id.toString()}>
                        {team.teamName ?? team.defaultName}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
