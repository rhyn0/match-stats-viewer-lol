import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stats/player")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/stats/player"!</div>;
}
