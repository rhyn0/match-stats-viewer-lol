import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import StandingTableLoading from "@/features/standings/components/loading";

export default function StandingsLoadingPage() {
    return (
        <main>
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader className="items-center">
                    <Skeleton className="justify-center w-96 h-14" />
                </CardHeader>
                <CardContent>
                    <StandingTableLoading />
                </CardContent>
            </Card>
        </main>
    );
}
