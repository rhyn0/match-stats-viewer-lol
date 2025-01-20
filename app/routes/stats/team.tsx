import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stats/team")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/stats/team"!</div>;
}
