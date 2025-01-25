import sortByPosition from "@/lib/sort-by-position";
import type { PlayerPositionT } from "@/types/league";

describe("sortByPosition", () => {
    it("should sort players by designated position in descending lane order", () => {
        const players = [
            { designatedPosition: "bot" },
            { designatedPosition: "top" },
            { designatedPosition: "sup" },
            { designatedPosition: "mid" },
            { designatedPosition: "jgl" },
        ] satisfies { designatedPosition: PlayerPositionT }[];

        const sortedPlayers = sortByPosition(players);

        expect(sortedPlayers).toEqual([
            { designatedPosition: "top" },
            { designatedPosition: "jgl" },
            { designatedPosition: "mid" },
            { designatedPosition: "bot" },
            { designatedPosition: "sup" },
        ]);
    });

    it("should handle an empty array", () => {
        const players: { designatedPosition: PlayerPositionT }[] = [];
        const sortedPlayers = sortByPosition(players);
        expect(sortedPlayers).toEqual([]);
    });

    it("should handle an array with one player", () => {
        const players = [{ designatedPosition: "mid" }] as {
            designatedPosition: PlayerPositionT;
        }[];
        const sortedPlayers = sortByPosition(players);
        expect(sortedPlayers).toEqual([{ designatedPosition: "mid" }]);
    });

    it("should handle players with the same position", () => {
        const players = [
            { designatedPosition: "bot" },
            { designatedPosition: "bot" },
            { designatedPosition: "sup" },
        ] as { designatedPosition: PlayerPositionT }[];

        const sortedPlayers = sortByPosition(players);

        expect(sortedPlayers).toEqual([
            { designatedPosition: "bot" },
            { designatedPosition: "bot" },
            { designatedPosition: "sup" },
        ]);
    });

    it("should handle players with invalid positions", () => {
        const players = [
            { designatedPosition: "bot" },
            { designatedPosition: "invalid" as PlayerPositionT },
            { designatedPosition: "sup" },
        ] as { designatedPosition: PlayerPositionT }[];

        const sortedPlayers = sortByPosition(players);

        expect(sortedPlayers).toEqual([
            { designatedPosition: "bot" },
            { designatedPosition: "sup" },
            { designatedPosition: "invalid" },
        ]);
    });
});
