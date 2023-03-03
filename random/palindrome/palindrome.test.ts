import { canBePalindrome } from './palindrome';

interface Test {
	string: string;
	result: boolean;
}

const tests: Test[] = [
	// cSpell: disable-next-line
	{ string: 'aaccd', result: true },
	{ string: 'nurses run', result: true },
	{ string: 'madam', result: true },
	{ string: 'madam', result: true },
	{ string: 'palindrome', result: false },
	{ string: 'tight fit', result: false },
];

describe('testing canBePalindrome', () => {
	it.each(tests)(
		'return if the characters can be a palindrome',
		({ string, result }) => {
			expect(canBePalindrome(string)).toBe(result);
		}
	);
});
