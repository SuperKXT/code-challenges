import { increasingSubsequence } from "./increasing-subsequence.js";

test("testing increasingSubsequence against test 1", () => {
	const result = increasingSubsequence([10, 9, 2, 3, 7, 101, 18]);
	const expected = 4;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing increasingSubsequence against test 2", () => {
	const result = increasingSubsequence([4, 4, 4, 4, 3]);
	const expected = 1;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
