const placementProbKeys = {
    all: ["placement-prob"] as const,
    detail: (id: number | string) => [...placementProbKeys.all, id] as const,
};

export default placementProbKeys;
export type KeyT = typeof placementProbKeys;
