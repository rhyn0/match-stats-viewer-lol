import { parseSecondsFromTimeString } from "@/features/upload-form/lib/parse-seconds-from-string";

describe("parseSecondsFromTimeString", () => {
    it("should parse a number of seconds from a MM:SS string", () => {
        const result = parseSecondsFromTimeString("10:10");

        expect(result).toEqual(610);
    });

    it("should handle leading zero strings", () => {
        const result = parseSecondsFromTimeString("001:01");
        expect(result).toEqual(61);
    });
});
