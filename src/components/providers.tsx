"use client";
import { getQueryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider, type SessionProviderProps } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import type React from "react";

type ProvidersProps = React.PropsWithChildren<SessionProviderProps>;

export default function Providers({ children, session }: ProvidersProps) {
    const queryClient = getQueryClient();

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
                <SessionProvider session={session}>{children}</SessionProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </ThemeProvider>
    );
}
