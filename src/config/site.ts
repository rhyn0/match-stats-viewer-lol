export const siteConfig = {
    github: {
        link: "https://github.com/rhyn0/match-stats-viewer-lol",
    },
    metadata: {
        title: {
            default: "Match Stats Viewer",
            template: "%s | Match Stats Viewer",
        },
        description: "Performance data for a local LoL Tournament.",
        creator: "Ryan Ozawa",
        keywords: [
            "SLOLCS",
            "Next.js",
            "React",
            "Tailwind CSS",
            "Server Components",
        ],
    },
};

export type SiteConfigType = typeof siteConfig;
