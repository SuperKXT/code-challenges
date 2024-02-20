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
	expect(result).toBe(16);
});

test('testing wordLengthProduct against test 2', () => {
	const result = wordLengthProduct(['a', 'aa', 'aaa', 'aaaa']);
	expect(result).toBe(0);
});
