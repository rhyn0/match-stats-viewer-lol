import { cn } from "@/lib/cn";

// type imports
import type { HeadingProps } from "./types";

export function TypoH1({ className, children }: HeadingProps) {
    return (
        <h1
            className={cn(
                "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
                className,
            )}
        >
            {children}
        </h1>
    );
}

export function TypoH2({ className, children }: HeadingProps) {
    return (
        <h2
            className={cn(
                "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
                className,
            )}
        >
            {children}
        </h2>
    );
}

export function TypoH3({ className, children }: HeadingProps) {
    return (
        <h3
            className={cn(
                "scroll-m-20 text-2xl font-semibold tracking-tight",
                className,
            )}
        >
            {children}
        </h3>
    );
}

export function TypoH4({ className, children }: HeadingProps) {
    return (
        <h4
            className={cn(
                "scroll-m-20 text-xl font-semibold tracking-tight",
                className,
            )}
        >
            {children}
        </h4>
    );
}
