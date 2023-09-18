import { maximumProfit } from './maximum-profit.js';

test('testing maximumProfit against test 1', () => {
	const result = maximumProfit([7, 1, 5, 3, 6, 4]);
	const expected = 5;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing maximumProfit against test 2', () => {
	const result = maximumProfit([2, 1]);
	const expected = 0;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing maximumProfit against test 3', () => {
	const result = maximumProfit([]);
	const expected = 0;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing maximumProfit against test 4', () => {
	const result = maximumProfit([2, 3, 1, 4, 750]);
	const expected = 749;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
