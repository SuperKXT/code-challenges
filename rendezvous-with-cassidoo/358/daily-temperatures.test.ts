import { dailyTemperatures } from './daily-temperatures.js';

test('testing dailyTemperatures against test 1', () => {
	const result = dailyTemperatures([70, 70, 70, 75]);
	const expected = [3, 2, 1, 0] as const;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});

test('testing dailyTemperatures against test 2', () => {
	const result = dailyTemperatures([90, 80, 70, 60]);
	const expected = [0, 0, 0, 0] as const;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});

test('testing dailyTemperatures against test 3', () => {
	const result = dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]);
	const expected = [1, 1, 4, 2, 1, 1, 0, 0] as const;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});
