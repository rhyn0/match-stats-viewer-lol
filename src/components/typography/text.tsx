import { cn } from "@/lib/cn";

// type imports
import type { HeadingProps } from "./types";

export function TypoP({ className, children }: HeadingProps) {
    return (
        <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
            {children}
        </p>
    );
}
