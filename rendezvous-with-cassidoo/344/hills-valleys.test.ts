import { hills, valleys } from './hills-valleys.js';

test('testing hills and valleys against test 1', () => {
	const arr = [1, 2, 1];
	const result = [hills(arr), valleys(arr)];
	const expected = [1, 0];
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing hills and valleys against test 2', () => {
	const arr = [1, 0, 1];
	const result = [hills(arr), valleys(arr)];
	const expected = [0, 1];
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing hills and valleys against test 3', () => {
	const arr = [7, 6, 5, 5, 4, 1];
	const result = [hills(arr), valleys(arr)];
	const expected = [0, 0];
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing hills and valleys against test 4', () => {
	const arr = [3, 4, 1, 1, 6, 5];
	const result = [hills(arr), valleys(arr)];
	const expected = [2, 1];
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
