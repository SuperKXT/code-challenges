import { parenthesisSubstring } from './parenthesis-substring';

const TESTS = [
	{ solution: 2, string: '(()(' },
	{ solution: 6, string: ')()(()))' },
	{ solution: 10, string: ')()(()(()))' },
	{ solution: 4, string: '())(())' },
];

describe('test parenthesisSubstring', () => {
	it.each(TESTS)(
		'should return longest valid string length',
		({ string, solution }) => {
			const response = parenthesisSubstring(string);
			expect(response).toStrictEqual(solution);
		}
	);
});
