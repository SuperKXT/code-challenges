import { wrapGifts } from "./wrap-gifts.js";

test("testing wrapGifts 1", () => {
	const result = wrapGifts([2, 3, 4, 5], 7);
	const expected = 2;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof expected>>(result);
});
test("testing wrapGifts 2", () => {
	const result = wrapGifts([1, 1, 1, 1, 1, 1, 1], 3);
	const expected = 3;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof expected>>(result);
});

test("testing wrapGifts 3", () => {
	const result = wrapGifts([1, 2, 3, 4, 5], 6);
	const expected = 3;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof expected>>(result);
});
