import { type } from "arktype";

const DateStringArk = type("string.date").pipe((s) => new Date(s));
export const PlacementProbArk = type({
    teamId: "number.integer",
    standing: "number.integer > 0",
    probability: "number",
    dateCreated: DateStringArk,
});
export type PlacementProbT = typeof PlacementProbArk.infer;
