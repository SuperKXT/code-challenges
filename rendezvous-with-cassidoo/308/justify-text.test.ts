import { justifyText } from './justify-text';

test('testing reversedSquares against test 1', () => {
	const result = justifyText(
		['This', 'is', 'an', 'example', 'of', 'text', 'justification.'],
		16,
	);
	const expected = [
		'This    is    an',
		'example  of text',
		'justification.  ',
	] as const;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing reversedSquares against test 2', () => {
	const result = justifyText(['something', 'is', 'off', 'with', 'this'], 4);
	const expected = ['something', 'is  ', 'off ', 'with', 'this'] as const;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing reversedSquares against test 3', () => {
	const result = justifyText(['something', 'is', 'off', 'with', 'this'], 10);
	const expected = ['something ', 'is     off', 'with  this'] as const;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
