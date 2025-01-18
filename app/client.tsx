/// <reference types="vinxi/types/client" />
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/start";
import { createRouter } from "./router";
import { ThemeProvider } from "./components/theme-provider";

const router = createRouter();

hydrateRoot(
    document,
    <ThemeProvider defaultTheme="system" storageKey="matchTheme">
        <StartClient router={router} />
    </ThemeProvider>,
);
