import { maxGap } from './max-gap.js';

test('testing removeDigit against test 1', () => {
	const result = maxGap([3, 6, 9, 1, 2]);
	const expected = 3;
	expect(result).toBe(expected);
	assertType<typeof result>(expected);
});

test('testing removeDigit against test 2', () => {
	const result = maxGap([1, 10, 12, 30, 32]);
	const expected = 18;
	expect(result).toBe(expected);
	assertType<typeof result>(expected);
});
