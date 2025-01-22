import NavigationBar from "@/components/navigation";
import { ThemePicker } from "@/components/theme-picker";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Icons } from "@/icons";
import { cn } from "@/lib/cn";
import { Link } from "@tanstack/react-router";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    return (
        <header className={cn("bg-secondary align-middle", className)}>
            <div className="pr-4 flex">
                <div className="flex space-x-8 md:justify-start">
                    <div>
                        <Link
                            to="/"
                            resetScroll={false}
                            className="flex items-center space-x-2 align-middle h-full dark:text-white"
                        >
                            {/* <img
                                src="/img/slovct-logo.png"
                                alt="SLOVCT"
                                height={40}
                                width={40}
                            /> */}
                            SLOLCS 2025 Match Stats
                        </Link>
                    </div>
                    <NavigationBar />
                </div>
                <div className="flex flex-1 md:justify-end">
                    <nav className="flex items-center space-x-2">
                        <a
                            href={siteConfig.github.link}
                            target="_blank"
                            rel="noreferrer"
                            className="h-8 w-8"
                        >
                            <div
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "mb-1 w-9 px-0 align-middle",
                                )}
                            >
                                <Icons.github className="size-5 dark:text-white" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </a>
                        <ThemePicker />
                    </nav>
                </div>
            </div>
        </header>
    );
}
