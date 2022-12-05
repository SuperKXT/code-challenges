import { parenthesisSubstring } from './parenthesis-substring';

const tests = [
	{ string: '(()(', solution: 2 },
	{ string: ')()(()))', solution: 6 },
	{ string: ')()(()(()))', solution: 10 },
	{ string: '())(())', solution: 4 },
];

describe('test parenthesisSubstring', () => {
	it.each(tests)('should return longest valid string length', (test) => {
		const solution = parenthesisSubstring(test.string);
		expect(solution).toStrictEqual(test.solution);
	});
});
