"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ErrorComponentProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function DefaultCatchBoundary({
    error,
    reset,
}: ErrorComponentProps) {
    const router = useRouter();

    console.error(error);

    return (
        <div className="min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6">
            <div className="flex gap-2 items-center flex-wrap">
                <Button
                    type="button"
                    onClick={() => reset()}
                    className="px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold"
                >
                    Try Again
                </Button>
                <Button
                    asChild
                    onMouseDown={(e) => {
                        e.preventDefault();
                        router.back();
                    }}
                    className="px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold"
                >
                    Go Back
                </Button>
            </div>
        </div>
    );
}
