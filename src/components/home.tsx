import { cn } from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";

export default function HomeLink({ className }: { className?: string }) {
    return (
        <Link
            href="/"
            scroll={false}
            prefetch={false}
            className={cn(
                "flex items-center space-x-2 dark:text-white",
                className,
            )}
        >
            <Image src={logo} alt="SLOVCT" height={40} width={40} />
            <span className="text-lg font-semibold ">SLOLCS 2025</span>
        </Link>
    );
}
