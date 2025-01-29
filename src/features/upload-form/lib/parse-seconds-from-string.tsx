import type { InputUploadMatchT } from "../types";

export function parseSecondsFromTimeString(
    val: InputUploadMatchT["matchRecord"]["gameTimeSeconds"],
): number {
    const [minutes, seconds] = val.split(":");
    return Number.parseInt(minutes) * 60 + Number.parseInt(seconds);
}
