import { equalLetterAndDigits } from './equal-letter-and-digits.js';

test('testing equalLetterAndDigits against test 1', () => {
	const result = equalLetterAndDigits('abc12345');
	const expected = 'abc123';
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing equalLetterAndDigits against test 2', () => {
	const result = equalLetterAndDigits('a123b4c');
	const expected = '3b4c';
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing equalLetterAndDigits against test 3', () => {
	const result = equalLetterAndDigits('a123b4');
	const expected = 'b4';
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing equalLetterAndDigits against test 4', () => {
	const result = equalLetterAndDigits('12');
	const expected = '';
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing equalLetterAndDigits against test 5', () => {
	const result = equalLetterAndDigits('a12bc34');
	const expected = 'a12bc3';
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
