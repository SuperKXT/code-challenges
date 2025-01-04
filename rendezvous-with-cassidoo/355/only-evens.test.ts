// cSpell: disable

import { onlyEvens } from "./only-evens.js";

test("testing onlyEvens against test 1", () => {
	const result = onlyEvens([1, 2, 3, 4, 5, 2]);
	const expected = [2, 2, 4];
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing onlyEvens against test 2", () => {
	const result = onlyEvens([7, 8, 1, 0, 2, 5]);
	const expected = [0, 2, 8];
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing onlyEvens against test 3", () => {
	const result = onlyEvens([11, 13, 15]);
	const expected = [] as number[];
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
