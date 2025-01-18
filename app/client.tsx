import { StartClient } from "@tanstack/start";
/// <reference types="vinxi/types/client" />
import { hydrateRoot } from "react-dom/client";
import { ThemeProvider } from "./components/theme-provider";
import { createRouter } from "./router";

const router = createRouter();

hydrateRoot(
    document,
    <ThemeProvider defaultTheme="system" storageKey="matchTheme">
        <StartClient router={router} />
    </ThemeProvider>,
);
