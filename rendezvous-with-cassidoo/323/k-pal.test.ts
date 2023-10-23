import { kPal } from './k-pal.js';

test('testing kPal against test 1', () => {
	const result = kPal('abb');
	const expected = true;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing kPal against test 2', () => {
	const result = kPal('cassidy');
	const expected = false;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
