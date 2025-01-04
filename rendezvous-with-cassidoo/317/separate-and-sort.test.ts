import { separateAndSort } from "./separate-and-sort.js";

test("testing separateAndSort against test 1", () => {
	const result = separateAndSort([4, 3, 2, 1, 5, 7, 8, 9]);
	const expected = [
		[2, 4, 8],
		[1, 3, 5, 7, 9],
	] as const;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing separateAndSort against test 2", () => {
	const result = separateAndSort([1, 1, 1, 1]);
	const expected = [[], [1, 1, 1, 1]] as const;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
