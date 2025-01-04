import { maxPairs } from "./max-pairs.js";

test("testing maxPairs against test 1", () => {
	const result = maxPairs(["L-10", "R-10", "L-11", "R-10", "L-10", "R-11"]);
	const expected = 3;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing maxPairs against test 2", () => {
	const result = maxPairs(["L-10", "L-11", "L-12", "L-13"]);
	const expected = 0;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing maxPairs against test 3", () => {
	const result = maxPairs(["L-8", "L-8", "L-8", "R-8"]);
	const expected = 1;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
