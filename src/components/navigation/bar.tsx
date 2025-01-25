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
                    <NavigationLink href="/upload" className="dark:text-white">
                        Upload
                    </NavigationLink>
                </NavigationMenuItem>
                {Object.entries(navComponents).map(([key, navigation]) => (
                    <NavigationMenuItem key={key}>
                        <NavigationMenuTrigger className="dark:text-white">
                            {navigation.triggerTitle}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {navigation.links.map((link) => (
                                    <li key={link.label}>
                                        <NavigationLink href={link.to}>
                                            {/* Due to implementation in NavigationLink, require singular child here */}
                                            <>
                                                <TypoH4>{link.label}</TypoH4>
                                                <TypoP>
                                                    {link.description}
                                                </TypoP>
                                            </>
                                        </NavigationLink>
                                    </li>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
