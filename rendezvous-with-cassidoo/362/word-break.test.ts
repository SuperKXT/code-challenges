import { wordBreak } from './word-break.js';

test('testing wordBreak against test 1', () => {
	const result = wordBreak('leetcode', ['leet', 'code']);
	const expected = true;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing wordBreak against test 2', () => {
	const result = wordBreak('catsandog', ['cat', 'cats', 'and', 'sand', 'dog']);
	const expected = false;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing wordBreak against test 2', () => {
	const result = wordBreak('aaaaaaaa', ['aa', 'aaa']);
	const expected = true;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
