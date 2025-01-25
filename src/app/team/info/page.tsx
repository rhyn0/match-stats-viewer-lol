import { TypoH1 } from "@/components/typography/headings";
import TeamGrid from "./team-grid";

// TODO<ryan>: handle renavigation to this page as an error redirect from team info page
// if search param `error` is present, display the error message and then clear the search param

export default function RouteComponent() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <TypoH1 className="text-4xl font-bold mb-8">
                SLOLCS 2025 Teams
            </TypoH1>
            <TeamGrid />
        </main>
    );
}
