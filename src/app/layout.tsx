import { Header } from "@/components/header";
import Providers from "@/components/providers";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { siteConfig } from "@/config/site";

// type imports
import type { Metadata } from "next";

// css import
import "./global.css";

export const metadata: Metadata = {
    ...siteConfig.metadata,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-background">
                <Providers>
                    <Header />
                    {children}
                    <TailwindIndicator />
                </Providers>
            </body>
        </html>
    );
}
