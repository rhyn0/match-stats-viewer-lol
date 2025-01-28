import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";

export default function LoadingPlayerCard({
    className,
}: { className?: string }) {
    return (
        <Card className={cn("size-[200px]", className)}>
            <CardContent className="pt-6 space-y-4">
                <div className="flex items-center space-x-4">
                    <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" />
                    <div>
                        <Skeleton className="w-20 h-10" />
                    </div>
                </div>
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-10 w-26 rounded-md ring-offset-background px-4 py-2 bg-white/80" />
            </CardContent>
        </Card>
    );
}
