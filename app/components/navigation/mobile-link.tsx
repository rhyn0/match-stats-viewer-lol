import { Link } from "@tanstack/react-router";

// type imports
import type { UseLinkPropsOptions } from "@tanstack/react-router";

interface MobileLinkProps extends UseLinkPropsOptions {
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
}

function MobileLink({
    to,
    onOpenChange,
    className,
    children,
    ...props
}: MobileLinkProps) {
    return (
        <Link
            {...props}
            onClick={() => {
                onOpenChange?.(false);
            }}
            className={className}
        >
            {children}
        </Link>
    );
}
export default MobileLink;
