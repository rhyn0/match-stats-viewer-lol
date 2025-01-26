import { TypoH2, TypoH3, TypoH4 } from "@/components/typography/headings";
import banner from "@/public/banner.png";
import { BarChart2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <main className="container mx-auto px-4 py-8">
                <section className="relative rounded-lg overflow-hidden shadow-2xl mb-12">
                    <Image
                        src={banner}
                        width={1200}
                        height={400}
                        alt="League of Legends tournament banner"
                        className="object-cover w-full sm:h-80 opacity-50 object-[0%_35%]"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 bg-black/70 dark:bg-gray-700/60 ">
                        <TypoH2 className="text-3xl sm:text-4xl mb-4 text-yellow-400 tracking-wide">
                            Welcome to SLOLCS 2025!
                        </TypoH2>
                        <TypoH4 className="max-w-2xl text-green-300 dark:text-inherit tracking-normal">
                            Join the epic battles, showcase your skills, and
                            claim victory in our community-driven League of
                            Legends competition!
                        </TypoH4>
                    </div>
                </section>

                <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { title: "Teams", icon: Users, href: "/team/info" },
                        // { title: "Players", icon: Users, href: "/players" },
                        // {
                        //     title: "Schedule",
                        //     icon: BarChart2,
                        //     href: "/schedule",
                        // },
                        // {
                        //     title: "Standings",
                        //     icon: Trophy,
                        //     href: "/standings",
                        // },
                        {
                            title: "Player Stats",
                            icon: BarChart2,
                            href: "/stats/player",
                        },
                        {
                            title: "Team Stats",
                            icon: BarChart2,
                            href: "/stats/team",
                        },
                        // { title: "Rules", icon: ChevronRight, href: "/rules" },
                    ].map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200 text-green-300 dark:text-inherit"
                        >
                            <TypoH3 className="font-semibold tracking-wide">
                                {item.title}
                            </TypoH3>
                            <item.icon className="w-6 h-6 text-yellow-400" />
                        </Link>
                    ))}
                </nav>
            </main>

            <footer className="container mx-auto px-4 py-6 mt-12 text-center text-sm">
                <p>&copy; 2025 SLOLCS. All rights reserved.</p>
            </footer>
        </div>
    );
}
