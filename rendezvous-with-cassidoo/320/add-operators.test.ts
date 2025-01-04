import { addOperators } from "./add-operators.js";

test("testing addOperators against test 1", () => {
	const result = addOperators(123, 6);
	const expected = ["1+2+3", "1*2*3"];
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing addOperators against test 2", () => {
	const result = addOperators(3456237490, 9191);
	const expected: string[] = [];
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing addOperators against test 3", () => {
	const result = addOperators(121, 2);
	const expected: string[] = ["1+2-1", "1*2*1", "1*2/1"];
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
