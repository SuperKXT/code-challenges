import { diceSum } from "./dice-sum.js";

test("testing diceSum against test 1", () => {
	const result = diceSum(1, 6, 3);
	const expected = 1;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing diceSum against test 1", () => {
	const result = diceSum(2, 6, 7);
	const expected = 6;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
