import { faultyVowels } from "./faulty-vowels.js";

test("testing faultyVowels against test 1", () => {
	const result = faultyVowels("string");
	/** cSpell: disable */
	const expected = "rtsng";
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing faultyVowels against test 2", () => {
	const result = faultyVowels("hello world!");
	/** cSpell: disable */
	const expected = "w hllrld!";
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
