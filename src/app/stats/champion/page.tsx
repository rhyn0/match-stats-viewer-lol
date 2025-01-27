import { TypoH1 } from "@/components/typography/headings";
import ClientTable from "./client";

export default function RouteComponent() {
    return (
        <main className="mx-8 bg-background">
            <TypoH1 className="justify-center flex text-foreground">
                Champion Stats
            </TypoH1>
            <ClientTable />
        </main>
    );
}
