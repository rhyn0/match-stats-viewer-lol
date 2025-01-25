"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type React from "react";

export default function NotFound({ children }: React.PropsWithChildren) {
    const router = useRouter();
    return (
        <div className="space-y-2 p-2">
            <div className="text-gray-600 dark:text-gray-400">
                {children || (
                    <p>The page you are looking for does not exist.</p>
                )}
            </div>
            <p className="flex items-center gap-2 flex-wrap">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        router.back();
                    }}
                    className="bg-emerald-500 text-white px-2 py-1 rounded uppercase font-black text-sm"
                >
                    Go back
                </button>
                <Link
                    href="/"
                    className="bg-cyan-600 text-white px-2 py-1 rounded uppercase font-black text-sm"
                >
                    Start Over
                </Link>
            </p>
        </div>
    );
}
