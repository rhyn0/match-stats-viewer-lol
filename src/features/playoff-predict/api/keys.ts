const playoffPredictKeys = {
    all: ["playoff-predict"] as const,
    teams: ["playoff-predict", "teams"],
    matches: ["playoff-predict", "matches"],
    predictions: ["playoff-predict", "predictions"],
    detail: (id: number | string) => [...playoffPredictKeys.all, id] as const,
};

export default playoffPredictKeys;
export type KeyT = typeof playoffPredictKeys;
