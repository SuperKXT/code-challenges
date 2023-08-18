import { faultyVowels } from './faulty-vowels';

test('testing faultyVowels against test 1', () => {
	const result = faultyVowels('string');
	/** cSpell: disable */
	const expected = 'rtsng' as const;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing faultyVowels against test 2', () => {
	const result = faultyVowels('hello world!');
	/** cSpell: disable */
	const expected = 'w hllrld!' as const;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
