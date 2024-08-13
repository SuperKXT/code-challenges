import { findUnused } from './squares.js';

test('testing findUnused against test 1', () => {
	const result = findUnused(['a = 1', 'b = a', 'c = 2', 'log(b)']);
	const expected = ['c'];
	expect(result).toStrictEqual(expected);
	assertType<typeof expected>(result);
});

test('testing findUnused against test 2', () => {
	const result = findUnused(['a = 1', 'b = a', 'c = 2', 'log(c)']);
	const expected = ['a', 'b'];
	expect(result).toStrictEqual(expected);
	assertType<typeof expected>(result);
});
