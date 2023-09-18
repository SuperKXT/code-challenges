import { canBePalindrome } from './palindrome.js';

type Test = {
	string: string;
	result: boolean;
};

const TESTS: Test[] = [
	// cSpell: disable-next-line
	{ result: true, string: 'aaccd' },
	{ result: true, string: 'nurses run' },
	{ result: true, string: 'madam' },
	{ result: true, string: 'madam' },
	{ result: false, string: 'palindrome' },
	{ result: false, string: 'tight fit' },
];

test.each(TESTS)('testing canBePalindrome', ({ string, result }) => {
	expect(canBePalindrome(string)).toBe(result);
});
