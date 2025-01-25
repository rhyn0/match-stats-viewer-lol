import { Header } from "@/components/header";
import Providers from "@/components/providers";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";
import { getServerSession } from "auth";
import { Inter } from "next/font/google";

// type imports
import type { Metadata, Viewport } from "next";

// css import
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    ...siteConfig.metadata,
};
export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`bg-background ${inter.className}`}>
                <Providers session={session}>
                    <Header />
                    {children}
                    <TailwindIndicator />
                </Providers>
                <Analytics />
            </body>
        </html>
    );
}
