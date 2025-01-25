import { TypoH1 } from "@/components/typography/headings";
import PlayerStatsClient from "./client";

export default function RouteComponent() {
    return (
        <main className="mx-8">
            <TypoH1 className="justify-center flex text-foreground">
                Player Stats
            </TypoH1>
            <PlayerStatsClient />
        </main>
    );
}
