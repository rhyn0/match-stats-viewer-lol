import type { DefaultOptions } from "@tanstack/react-query";

export const queryConfig = {
    queries: {
        // throwOnError: true,
        refetchOnWindowFocus: false, // This is a good default for most apps
        retry: false, // This is a good default for most apps
        staleTime: 1000 * 60 * 60, // our data can change at most from hour to hour.
        refetchInterval: false, // We don't want to refetch
        refetchOnMount: false, // We don't want to refetch
    },
} satisfies DefaultOptions;
