import { createRootRouteWithContext } from "@tanstack/react-router";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import type { QueryClient } from "@tanstack/react-query";
import DefaultCatchBoundary from "@/components/error-boundary";
import NotFound from "@/components/not-found";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { TailwindIndicator } from "@/components/tailwind-indicator";

// type imports
import type { ReactNode } from "react";

// CSS import
import "../global.css";

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient;
}>()({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                title: "TanStack Start Starter",
            },
        ],
    }),
    component: RootComponent,
    errorComponent: (props) => {
        return (
            <RootDocument>
                <DefaultCatchBoundary {...props} />
            </RootDocument>
        );
    },
    notFoundComponent: () => <NotFound />,
});

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    );
}
const RouterDevtools =
    process.env.NODE_ENV === "development"
        ? React.lazy(() =>
              // Lazy load in development
              import("@tanstack/router-devtools").then((res) => ({
                  default: res.TanStackRouterDevtools,
                  // For Embedded Mode
                  //   default: res.TanStackRouterDevtoolsPanel,
              })),
          )
        : () => null;

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <Meta />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <ReactQueryDevtools initialIsOpen={false} />
                <React.Suspense>
                    <RouterDevtools />
                </React.Suspense>
                <TailwindIndicator />
                <Scripts />
            </body>
        </html>
    );
}
