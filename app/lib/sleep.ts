/**
 *  Await sleep time
 *
 * @param ms Number of ms to sleep
 * @returns void
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
