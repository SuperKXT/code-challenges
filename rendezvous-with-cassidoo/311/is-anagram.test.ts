import { isAnagram } from './is-anagram';

test('testing isAnagram against test 1', () => {
	const result = isAnagram('barbie', 'oppenheimer');
	const expected = false;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing isAnagram against test 2', () => {
	const result = isAnagram('care', 'race');
	const expected = true;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
