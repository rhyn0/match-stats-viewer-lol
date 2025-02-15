import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function StandingTableLoading({
    className,
}: { className?: string }) {
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
                {Array(8)
                    .fill(null)
                    .map((_, idx) => (
                        <TableRow
                            // biome-ignore lint/suspicious/noArrayIndexKey: Placeholder
                            key={idx}
                            className="nth-8:border-red-500 nth-8:border-b-2"
                        >
                            <TableCell className="p-0">
                                <Skeleton className="w-full h-14 rounded-none" />
                            </TableCell>
                            <TableCell className="w-full p-0 px-4 py-1">
                                <Skeleton className="w-full h-14 rounded-none" />
                            </TableCell>
                            <TableCell className="p-0">
                                <Skeleton className="w-full h-14 rounded-none" />
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}
