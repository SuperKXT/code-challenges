import { stringSplit } from './string-split.js';

test('testing stringSplit', () => {
	const str = 'This is so, so silly!';

	const result1 = stringSplit(str, ' ');
	const expected1 = ['This', 'is', 'so,', 'so', 'silly!'];
	expect(result1).toStrictEqual(expected1);
	assertType<typeof result1>(expected1);

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
	];
	expect(result2).toStrictEqual(expected2);
	assertType<typeof result2>(expected2);

	const result3 = stringSplit(str, ',');
	const expected3 = ['This is so', ' so silly!'];
	expect(result3).toStrictEqual(expected3);
	assertType<typeof result3>(expected3);
});
