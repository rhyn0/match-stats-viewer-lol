import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/cn";
import { Link, type UseLinkPropsOptions } from "@tanstack/react-router";

function NavigationLink({
    children,
    className,
    title,
    ...rest
}: UseLinkPropsOptions) {
    return (
        <Link {...rest}>
            {({ isActive }) => (
                <NavigationMenuLink
                    active={isActive}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className,
                    )}
                >
                    {children}
                </NavigationMenuLink>
            )}
        </Link>
    );
}

export default NavigationLink;
