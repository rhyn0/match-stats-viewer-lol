import { TypoH1 } from "@/components/typography/headings";
import ClienTable from "./client-table";

export default function RouteComponent() {
    return (
        <main className="mx-8 bg-background">
            <TypoH1 className="justify-center flex text-foreground">
                Team Stats
            </TypoH1>
            <ClienTable />
        </main>
    );
}
