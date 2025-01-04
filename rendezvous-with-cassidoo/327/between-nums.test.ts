import { betweenNums } from "./between-nums.js";

test("testing betweenNums against test 1", () => {
	const result = betweenNums(3, 11, "even");
	const expected = [4, 6, 8, 10] as const;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});

test("testing betweenNums against test 2", () => {
	const result = betweenNums(15, 1, "prime");
	const expected = [2, 3, 5, 7, 11, 13] as const;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});
