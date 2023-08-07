import { luhnCheck } from './luh-check';

test('testing isAnagram against test 1', () => {
	const result = luhnCheck(123456789);
	const expected = false;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing isAnagram against test 2', () => {
	const result = luhnCheck(5555555555554444);
	const expected = true;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
