import { stringSplit } from './string-split.js';

test('testing stringSplit', () => {
	const str = 'This is so, so silly!';

	const result1 = stringSplit(str, ' ');
	const expected1 = ['This', 'is', 'so,', 'so', 'silly!'] as const;
	expect(result1).toStrictEqual(expected1);
	assertType<Readonly<typeof result1>>(expected1);

	const result2 = stringSplit(str, '');
	const expected2 = [
		'T',
		'h',
		'i',
		's',
		' ',
		'i',
		's',
		' ',
		's',
		'o',
		',',
		' ',
		's',
		'o',
		' ',
		's',
		'i',
		'l',
		'l',
		'y',
		'!',
	] as const;
	expect(result2).toStrictEqual(expected2);
	assertType<Readonly<typeof result2>>(expected2);

	const result3 = stringSplit(str, ',');
	const expected3 = ['This is so', ' so silly!'] as const;
	expect(result3).toStrictEqual(expected3);
	assertType<Readonly<typeof result3>>(expected3);
});
