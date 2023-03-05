import { parenthesisSubstring } from './parenthesis-substring';

const tests = [
	{ solution: 2, string: '(()(' },
	{ solution: 6, string: ')()(()))' },
	{ solution: 10, string: ')()(()(()))' },
	{ solution: 4, string: '())(())' },
];

describe('test parenthesisSubstring', () => {
	it.each(tests)(
		'should return longest valid string length',
		({ string, solution }) => {
			const response = parenthesisSubstring(string);
			expect(response).toStrictEqual(solution);
		}
	);
});
