import { countAndSay } from './count-and-say.js';

test('testing countAndSay against test 1', () => {
	const result = countAndSay(112222555);
	const expected = 'two 1s, then four 2s, then three 5s' as const;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing countAndSay against test 2', () => {
	const result = countAndSay(3333333333);
	const expected = 'ten 3s' as const;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing countAndSay against test 3', () => {
	const result = countAndSay(3333333333333333);
	const expected = 'sixteen 3s' as const;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
