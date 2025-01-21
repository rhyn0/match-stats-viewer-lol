import type { PlayerPositionT } from "@/types/league";
export default function sortByPosition<
    T extends { designatedPosition: PlayerPositionT },
>(data: T[]) {
    // sort order should be in descending lane order
    // so top, jungle, mid, bot, support
    const order: PlayerPositionT[] = ["top", "jgl", "mid", "bot", "sup"];
    return data.sort((a, b) => {
        const aIndex = order.indexOf(a.designatedPosition);
        const bIndex = order.indexOf(b.designatedPosition);
        return (
            (aIndex !== -1 ? aIndex : order.length) -
            (bIndex !== -1 ? bIndex : order.length)
        );
    });
}
