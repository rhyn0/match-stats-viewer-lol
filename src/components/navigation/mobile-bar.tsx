"use client";

import { TypoH4 } from "@/components/typography/headings";
import { TypoP } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";
import MobileLink from "./mobile-link";
import navComponents from "./nav-components";

export function MobileNavigationBar() {
    const [open, setOpen] = React.useState<boolean>(false);
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="mt-1 md:hidden">
                    <Menu />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                    <div className="flex flex-col space-y-4">
                        {Object.entries(navComponents).map(
                            ([key, navigation]) => (
                                <div
                                    key={key}
                                    className="flex flex-col space-y-2 pt-4"
                                >
                                    <h4>
                                        {navigation.triggerTitle.toUpperCase()}
                                    </h4>
                                    {navigation.links.map(
                                        ({ label, to, description }) => (
                                            <MobileLink
                                                key={label}
                                                href={to}
                                                onOpenChange={setOpen}
                                                className="text-muted-foreground"
                                            >
                                                <TypoH4>{label}</TypoH4>
                                                <TypoP>{description}</TypoP>
                                            </MobileLink>
                                        ),
                                    )}
                                </div>
                            ),
                        )}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
