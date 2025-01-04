import { zerosInFactorial } from "./zeros-in-factorial.js";

test("testing zerosInFactorial 1", () => {
	const result = zerosInFactorial(5);
	const expected: number = 1;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof expected>>(result);
});
test("testing zerosInFactorial 2", () => {
	const result = zerosInFactorial(10);
	const expected: number = 2;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof expected>>(result);
});

test("testing zerosInFactorial 3", () => {
	const result = zerosInFactorial(100);
	const expected: number = 24;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof expected>>(result);
});
