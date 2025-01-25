/**
 *
 * @param summonerName RiotId of the player - e.g. "Dyrus#1234"
 * @param region op.gg region code, defaults to "na"
 * @returns a URL to the player's op.gg profile
 */
export function playerOpGgUrl(summonerName: string, region = "na"): URL {
    const encodedName = encodeURIComponent(summonerName.replace(/#/, "-"));
    return new URL(`https://na.op.gg/summoners/${region}/${encodedName}`);
}

/**
 * Multi-op.gg search URL, lists multiple players at one link
 * @param summonerNames RiotIds of the players - e.g. ["Dyrus#1234", "Doublelift#5678"]
 * @param region op.gg region code, defaults to "na"
 * @returns a URL to the multi-op.gg search
 */
export function multiOpGgUrl(summonerNames: string[], region = "na"): URL {
    const encodedNames = encodeURIComponent(summonerNames.join(","));
    return new URL(
        `https://na.op.gg/multisearch/${region}?summoners=${encodedNames}`,
    );
}
