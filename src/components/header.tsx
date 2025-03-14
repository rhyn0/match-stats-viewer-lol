import NavigationBar from "@/components/navigation";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Icons } from "@/icons";
import { cn } from "@/lib/cn";
import { Inter } from "next/font/google";
import HomeLink from "./home";
import LoginButton from "./login-button";
import { ThemePicker } from "./theme-picker";

interface HeaderProps {
    className?: string;
}

const inter = Inter({ subsets: ["latin"] });

export function Header({ className }: HeaderProps) {
    return (
        <header
            className={cn(
                "bg-secondary h-20 flex items-center",
                className,
                inter.className,
            )}
        >
            <div className="w-full mx-auto flex items-center justify-between px-4">
                {/* Left Section: Logo and Navigation */}
                <div className="flex items-center space-x-8">
                    <HomeLink />
                    <NavigationBar />
                </div>

                {/* Right Section: GitHub, Login, and Theme Picker */}
                <div className="flex items-center space-x-4">
                    <LoginButton />
                    <a
                        href={siteConfig.github.link}
                        target="_blank"
                        rel="noreferrer"
                        className="h-8 w-8 flex items-center justify-center"
                    >
                        <div
                            className={cn(
                                buttonVariants({ variant: "ghost" }),
                                "w-9 px-0 flex items-center justify-center",
                            )}
                        >
                            <Icons.github className="h-5 w-5 dark:text-white" />
                            <span className="sr-only">GitHub</span>
                        </div>
                    </a>
                    <ThemePicker />
                </div>
            </div>
        </header>
    );
}
