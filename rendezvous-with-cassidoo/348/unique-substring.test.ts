import { uniqueSubstring } from './unique-substring.js';

test('testing uniqueSubstring against test 1', () => {
	const result = uniqueSubstring('eceba'); // cSpell: disable-line
	const expected = 3;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing uniqueSubstring against test 1', () => {
	const result = uniqueSubstring('ccaabbb'); // cSpell: disable-line
	const expected = 5;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing uniqueSubstring against test 3', () => {
	const result = uniqueSubstring('abcabcabc'); // cSpell: disable-line
	const expected = 2;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing uniqueSubstring against test 4', () => {
	const result = uniqueSubstring('aebebebe'); // cSpell: disable-line
	const expected = 7;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
