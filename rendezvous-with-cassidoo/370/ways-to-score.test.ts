import { waysToScore } from './ways-to-score.js';

test('testing waysToScore against test 1', () => {
	const result = waysToScore(5);
	const expected = 1;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing waysToScore against test 2', () => {
	const result = waysToScore(12);
	const expected = 6;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing waysToScore against test 3', () => {
	const result = waysToScore(6);
	const expected = 3;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
