const scheduleKeys = {
    all: ["schedule"] as const,
    detail: (id: number | string) => [...scheduleKeys.all, id] as const,
};

export default scheduleKeys;
export type KeyT = typeof scheduleKeys;
