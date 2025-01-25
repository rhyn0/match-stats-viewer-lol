export default function divideDefault(
    dividend: number,
    divisor: number,
    fallback: number,
): number {
    return divisor !== 0 ? dividend / divisor : fallback;
}
