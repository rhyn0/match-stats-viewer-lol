import { TypoH1 } from "@/components/typography/headings";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <main className="container w-full flex flex-col justify-self-center space-y-4 mt-20">
            <TypoH1 className="text-center">
                Sorry you are not an Admin. You aren't allowed to login.
            </TypoH1>
            <Button variant="default" asChild className="w-20 h-10 mx-auto">
                <Link href="/">Go Back</Link>
            </Button>
        </main>
    );
}
