const teamsKeys = {
    all: ["teams"] as const,
    detail: (id: number) => [...teamsKeys.all, id] as const,
};

export default teamsKeys;
export type KeyT = typeof teamsKeys;
