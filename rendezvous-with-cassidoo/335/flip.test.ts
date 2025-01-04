import { flip } from "./flip.js";

test("testing flip against test 1", () => {
	const arr = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	] as const;
	const result = {
		horizontal: flip(arr, "horizontal"),
		vertical: flip(arr, "vertical"),
	};
	const expected = {
		horizontal: [
			[3, 2, 1],
			[6, 5, 4],
			[9, 8, 7],
		] as const,
		vertical: [
			[7, 8, 9],
			[4, 5, 6],
			[1, 2, 3],
		] as const,
	};
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});
