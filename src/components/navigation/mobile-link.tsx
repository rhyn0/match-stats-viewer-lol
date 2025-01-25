import Link from "next/link";

// type imports
import type { LinkProps } from "next/link";

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
}

function MobileLink({
    href,
    onOpenChange,
    className,
    children,
    ...props
}: MobileLinkProps) {
    return (
        <Link
            href={href}
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
