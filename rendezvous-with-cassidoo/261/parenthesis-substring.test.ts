import { parenthesisSubstring } from './parenthesis-substring';

const tests = [
	{ string: '(()(', solution: 2 },
	{ string: ')()(()))', solution: 6 },
	{ string: ')()(()(()))', solution: 10 },
	{ string: '())(())', solution: 4 },
];

describe('swap array pairs with regex', () => {

	for (const test of tests) {
		it(`should return ${test.solution} for ${test.string}`, () => {
			const solution = parenthesisSubstring(test.string);
			expect(solution).toStrictEqual(test.solution);
		});
	}

});