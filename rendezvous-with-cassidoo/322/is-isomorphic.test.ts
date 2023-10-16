import { isIsomorphic } from './is-isomorphic.js';

test('testing isIsomorphic against test 1', () => {
	const result = isIsomorphic('abb', 'cdd');
	const expected = true;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing isIsomorphic against test 2', () => {
	const result = isIsomorphic('cassidy', '1234567');
	const expected = false;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing isIsomorphic against test 3', () => {
	const result = isIsomorphic('cass', '1233'); // cSpell: disable-line
	const expected = true;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing isIsomorphic against test 4', () => {
	const result = isIsomorphic('cas', '1233');
	const expected = false;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
