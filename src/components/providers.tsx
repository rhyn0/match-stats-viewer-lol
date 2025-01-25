"use client";
import { getQueryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";

import type React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools />
            </QueryClientProvider>
        </ThemeProvider>
    );
}
