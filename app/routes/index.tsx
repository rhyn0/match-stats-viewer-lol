import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div className="bg-red-600/90">Hello "/"!</div>;
}
