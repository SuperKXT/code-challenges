import { canBePalindrome } from './palindrome';

interface Test {
	string: string;
	result: boolean;
}

const TESTS: Test[] = [
	// cSpell: disable-next-line
	{ result: true, string: 'aaccd' },
	{ result: true, string: 'nurses run' },
	{ result: true, string: 'madam' },
	{ result: true, string: 'madam' },
	{ result: false, string: 'palindrome' },
	{ result: false, string: 'tight fit' },
];

describe('testing canBePalindrome', () => {
	it.each(TESTS)(
		'return if the characters can be a palindrome',
		({ string, result }) => {
			expect(canBePalindrome(string)).toBe(result);
		}
	);
});
