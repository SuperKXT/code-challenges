import { explodeString } from "./explode-string.js";

test("testing explodeString against test 1", () => {
	const result = explodeString("Ahh, abracadabra!");
	const expected = ["!", ",", "A", "aaaaa", "bb", "c", "d", "hh", "rr"];
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing explodeString against test 2", () => {
	const result = explodeString("o/o/");
	const expected = ["//", "\\", "oo"];
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
