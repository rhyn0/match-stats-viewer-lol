import { TypoH4 } from "@/components/typography/headings";
import { TypoP } from "@/components/typography/text";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MobileNavigationBar } from "./mobile-bar";
import navComponents from "./nav-components";
import NavigationLink from "./nav-link";

export default function NavigationBar() {
    return (
        <>
            <MainNavigationBar />
            <MobileNavigationBar />
        </>
    );
}
function MainNavigationBar() {
    return (
        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationLink
                        href="/upload"
                        className="dark:text-white"
                        prefetch={false}
                    >
                        Upload
                    </NavigationLink>
                </NavigationMenuItem>
                {Object.entries(navComponents).map(([key, navigation]) => {
                    // WHAT THE SIGMA WHY IS TEAMS TAB SO WIDE?????
                    // THIS FIXES THAT
                    // Determine the number of links
                    const linkCount = navigation.links.length;

                    // Determine grid columns based on link count
                    const gridCols =
                        linkCount >= 2
                            ? "md:grid-cols-2 lg:grid-cols-2"
                            : "md:grid-cols-1 lg:grid-cols-1";

                    // Determine width based on link count
                    const width =
                        linkCount >= 2
                            ? "w-[400px] md:w-[500px] lg:w-[600px]"
                            : "w-[200px] md:w-[300px] lg:w-[400px]";

                    const ulClasses = `grid gap-3 p-4 ${gridCols} ${width}`;

                    return (
                        <NavigationMenuItem key={key}>
                            <NavigationMenuTrigger className="dark:text-white">
                                {navigation.triggerTitle}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className={ulClasses}>
                                    {navigation.links.map((link) => (
                                        <li
                                            key={link.label}
                                            className="relative"
                                        >
                                            <NavigationLink
                                                href={link.to}
                                                prefetch={false}
                                                className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800"
                                                aria-describedby={`desc-${key}-${link.label}`}
                                            >
                                                <TypoH4 className="text-base font-medium text-gray-900 dark:text-white">
                                                    {link.label}
                                                </TypoH4>
                                            </NavigationLink>
                                            <div
                                                id={`desc-${key}-${link.label}`}
                                                className="mt-1 w-full p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10"
                                                role="tooltip"
                                                aria-hidden="false"
                                            >
                                                <TypoP className="text-sm text-gray-700 dark:text-gray-300">
                                                    {link.description}
                                                </TypoP>
                                                <div className="absolute top-0 left-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-white dark:border-b-gray-800" />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    );
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
