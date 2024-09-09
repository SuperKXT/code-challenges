import { minRows } from './min-rows.js';

test('testing minRows against test 1', () => {
	const result = minRows([4, 8, 3, 5, 6], 10);
	const expected = 3;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing minRows against test 2', () => {
	const result = minRows([4, 5, 4, 3, 3], 10);
	const expected = 2;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing minRows against test 3', () => {
	const result = minRows([7, 7, 8, 9, 6], 10);
	const expected = 5;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing minRows against test 4', () => {
	const result = minRows([1, 4, 8, 1, 6, 10], 10);
	const expected = 3;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
