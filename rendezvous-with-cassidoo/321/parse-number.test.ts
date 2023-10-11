import { parseNumber } from './parse-number.js';

test('testing parseNumber against test 1', () => {
	const result = parseNumber('Twelve Thousand Three Hundred Forty Five');
	const expected = 12345;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing parseNumber against test 2', () => {
	const result = parseNumber('One Hundred Twenty Three');
	const expected = 123;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
