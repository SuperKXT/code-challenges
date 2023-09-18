/** cSpell: disable */
import { trimArray } from './trim-array.js';

test('testing trimArray against test 1', () => {
	const response = trimArray([1, 2, 3, 4, 5, 6], 2, 1);
	const expected = [3, 4, 5] as const;
	expect(response).toStrictEqual(expected);
	assertType<typeof expected>(response);
});

test('testing trimArray against test 2', () => {
	const response = trimArray([6, 2, 4, 3, 7, 1, 3], 2, 0);
	const expected = [4, 3, 7, 1, 3] as const;
	expect(response).toStrictEqual(expected);
	assertType<typeof expected>(response);
});

test('testing trimArray against test 3', () => {
	const response = trimArray([1, 7], 0, 0);
	const expected = [1, 7] as const;
	expect(response).toStrictEqual(expected);
	assertType<typeof expected>(response);
});
