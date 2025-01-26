const championPresenceKeys = {
    all: ["champion-presence"] as const,
    detail: (id: number | string) => [...championPresenceKeys.all, id] as const,
};

export default championPresenceKeys;
export type KeyT = typeof championPresenceKeys;
