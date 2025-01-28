// doesn't follow `loading.tsx` convention as want to
// manually inject at my defined Suspense boundaries

import { Skeleton } from "@/components/ui/skeleton";
import LoadingPlayerCard from "@/features/team-viewer/components/loading/player-card";

export default function LoadingTeamPage() {
    return (
        <>
            <Skeleton className="mb-8 h-14 w-96 bg-accent-foreground/70" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {Array(5)
                    .fill(null)
                    .map((_, idx) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey:
                        <LoadingPlayerCard key={idx} />
                    ))}
            </div>
        </>
    );
}
