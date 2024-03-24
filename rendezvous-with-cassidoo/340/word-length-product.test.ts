import { wordLengthProduct } from './word-length-product.js';

test('testing wordLengthProduct against test 1', () => {
	const result = wordLengthProduct([
		'fish',
		'fear',
		'boo',
		'egg',
		'cake',
		'abcdef',
	]);
	const expected = 16;
	expect(result).toBe(expected);
	assertType<typeof result>(expected);
});

test('testing wordLengthProduct against test 2', () => {
	const result = wordLengthProduct(['a', 'aa', 'aaa', 'aaaa']);
	const expected = 0;
	expect(result).toBe(expected);
	assertType<typeof result>(expected);
});
