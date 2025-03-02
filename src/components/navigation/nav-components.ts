const navComponents = {
    regularSeason: {
        triggerTitle: "Overall Statistics",
        links: [
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
            {
                label: "Champion Statistics",
                to: "/stats/champion",
                description:
                    "Table view of champion statistics like ban rate and presence.",
            },
            {
                label: "Weekly Statistics",
                to: "/stats/weekly",
                description: "Charts visualization KDA stats by each week.",
            },
            {
                label: "Position Statistics",
                to: "/stats/position",
                description: "Charts visualization KDA stats by each position.",
            },
            {
                label: "Team Standings Probabilities",
                to: "/team/placement",
                description:
                    "Charts visualization for likelihood of ending at each standing.",
            },
        ],
    },
    information: {
        triggerTitle: "Tournament Information",
        links: [
            {
                label: "Teams",
                to: "/team/info",
                description:
                    "View all teams participating in the tournament. Check out their rosters.",
            },
            {
                label: "Schedule",
                to: "/schedule",
                description:
                    "Previous Results and To be played matchups on the calendar.",
            },
            {
                label: "Standings",
                to: "/stats/standing",
                description:
                    "Current standings of the teams in the tournament.",
            },
            {
                label: "Playoffs",
                to: "/playoffs",
                description: "Playoffs Bracket and other fun stuff.",
            },
        ],
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
