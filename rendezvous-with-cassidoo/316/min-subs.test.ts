import { minSubs } from './min-subs';

test('testing minSubs against test 1', () => {
	const result = minSubs([1, 3, 20, 4, 8, 9, 11], 3);
	const expected = [4, 8, 9];
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing minSubs against test 2', () => {
	const result = minSubs([4, 4, 4, 4, 8], 2);
	const expected = [4, 4];
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
