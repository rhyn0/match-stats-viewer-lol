import {
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link, { type LinkProps } from "next/link";

interface NavigationLinkProps extends LinkProps {
    className?: string;
}

function NavigationLink({
    children,
    className,
    ...rest
}: React.PropsWithChildren<NavigationLinkProps>) {
    return (
        <Link passHref legacyBehavior {...rest}>
            {/* {({ isActive }) => (
                    asChild
                    active={isActive}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className,
                    )}
                > */}
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {children}
            </NavigationMenuLink>
            {/* )} */}
        </Link>
    );
}

export default NavigationLink;
