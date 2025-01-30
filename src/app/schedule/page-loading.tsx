import { Skeleton } from "@/components/ui/skeleton";

export default function MatchListFallback() {
    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <section className="grid">
                <Skeleton className="justify-self-center h-12 w-28 mb-2" />
                <div className="space-y-4">
                    {Array(6)
                        .fill(null)
                        .map((_, idx) => (
                            <Skeleton
                                // biome-ignore lint/suspicious/noArrayIndexKey: just has to
                                key={idx}
                                className="w-full h-30 rounded-lg shadow-md shadow-white/30 "
                            />
                        ))}
                </div>
            </section>
        </div>
    );
}
