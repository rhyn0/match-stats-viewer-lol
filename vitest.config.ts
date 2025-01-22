import viteTsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [viteTsConfigPaths()],
    test: {
        environment: "jsdom",
        setupFiles: ["./testing/vitest.setup.ts"],
        reporters: [
            [
                "default",
                {
                    summary: false,
                },
            ],
        ],
        exclude: ["**/node_modules/**", "**/e2e/**"],
        coverage: {
            enabled: true,
            provider: "istanbul",
            include: ["app/**"],
            reporter: ["text-summary", "html"],
            exclude: ["app/routeTree.gen.ts"],
            skipFull: true,
        },
        include: ["testing/**/*.test.ts?(x)"],
        globals: true,
    },
});
