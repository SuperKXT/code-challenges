import { fourSum } from './four-sum.js';

test('testing fourSum against test 1', () => {
	const result = fourSum([1, 0, -1, 0, -2, 2], 0);
	const expected = [
		[-2, -1, 1, 2],
		[-2, 0, 0, 2],
		[-1, 0, 0, 1],
	];
	const matched = result.every((arr) =>
		expected.some((row) => row.every((num) => arr.includes(num))),
	);
	expect(matched).toBeTruthy();
	assertType<typeof result>(expected);
});

test('testing fourSum against test 2', () => {
	const result = fourSum([], 0);
	const expected = [] as number[][];
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing fourSum against test 3', () => {
	const result = fourSum([1, -2, -5, -4, -3, 3, 3, 5], -11);
	const expected = [[-5, -4, -3, 1]];
	const matched = result.every((arr) =>
		expected.some((row) => row.every((num) => arr.includes(num))),
	);
	expect(matched).toBeTruthy();
	assertType<typeof result>(expected);
});

test('testing fourSum against test 4', () => {
	const result = fourSum([2, 2, 2, 2, 2], 8);
	const expected = [[2, 2, 2, 2]];
	const matched = result.every((arr) =>
		expected.some((row) => row.every((num) => arr.includes(num))),
	);
	expect(matched).toBeTruthy();
	assertType<typeof result>(expected);
});

test('testing fourSum against test 5', () => {
	const result = fourSum([1, 2, 3, 4, 5], 10);
	const expected = [[1, 2, 3, 4]];
	const matched = result.every((arr) =>
		expected.some((row) => row.every((num) => arr.includes(num))),
	);
	expect(matched).toBeTruthy();
	assertType<typeof result>(expected);
});

test('testing fourSum against test 6', () => {
	const result = fourSum([1, -2, -5, -4, -3, 3, 3, 5], -11);
	const expected = [[1, -5, -4, -3]];
	const matched = result.every((arr) =>
		expected.some((row) => row.every((num) => arr.includes(num))),
	);
	expect(matched).toBeTruthy();
	assertType<typeof result>(expected);
});
