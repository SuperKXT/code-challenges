import { rotatedArray } from './rotated-array.js';

test('testing rotatedArray against test 1', () => {
	console.log('reached');
	const result = rotatedArray([4, 0, 1, 2, 3]);
	const expected = 1;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});

test('testing rotatedArray against test 2', () => {
	const result = rotatedArray([7, 9, 20]);
	const expected = 0;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});

test('testing rotatedArray against test 3', () => {
	const result = rotatedArray([7, 7, 314, 1337, 7]);
	const expected = 4;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});
