import { linkOptions } from "@tanstack/react-router";

const navComponents = {
    regularSeason: {
        triggerTitle: "Overall Statistics",
        links: linkOptions([
            {
                label: "Player Statistics",
                to: "/stats/player",
                description:
                    "Table view of player statistics across the tournament. Displaying KDA statistics as well as preferred Champions to play.",
            },
            {
                label: "Team Statistics",
                to: "/stats/team",
                description:
                    "Table view of team statistics across the tournament. Displaying per side win rates and overall trends.",
            },
        ]),
    },
    //     playoffs: {
    //         triggerTitle: "Playoffs",
    //         links: linkOptions([
    //             {
    //                 title: "Head To Head Breaker",
    //                 href: "/playoffs/h2h",
    //                 description:
    //                     "Check head-to-head matchups and who breaks ties where. Useful information when seeding is being decided and need to know who comes out on top.",
    //             },
    //             {
    //                 title: "Player Statistics in Playoffs",
    //                 href: "/playoffs/player",
    //                 description:
    //                     "Table view of player statistics across playoffs. Displaying KDA statistics as well as preferred Agents to play.",
    //             },
    //             {
    //                 title: "Team Statistics in Playoffs",
    //                 href: "/playoffs/team",
    //                 description:
    //                     "Table view of team statistics across playoffs. Displaying per map win rates and overall round count trends.",
    //             },
    //         ]),
    //     },
};

export default navComponents;
