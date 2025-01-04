import { removeDigit } from "./remove-digit.js";

test("testing removeDigit against test 1", () => {
	const result = removeDigit(31415926, 1);
	const expected = 3415926;
	expect(result).toBe(expected);
	assertType<typeof result>(expected);
});

test("testing removeDigit against test 2", () => {
	const result = removeDigit(1231, 1);
	const expected = 231;
	expect(result).toBe(expected);
	assertType<typeof result>(expected);
});
