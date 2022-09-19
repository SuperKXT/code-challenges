import { calculateGpa, GradePoint } from './calculate-gpa';

interface Test {
	input: GradePoint[],
	output: number,
}

const tests: Test[] = [
	{
		input: ['A'],
		output: 4,
	},
	{
		input: ['F', 'F', 'F'],
		output: 0,
	},
	{
		input: ['A', 'A-', 'B+', 'B', 'B-'],
		output: 3.3,
	},
	{
		input: ['A', 'B+', 'C-', 'A'],
		output: 3.3,
	},
	{
		input: ['A-', 'B-', 'C-', 'D-'],
		output: 2.2,
	},
];

describe('testing calculateGpa', () => {
	for (const test of tests) {
		it(`should return ${test.output} for box: calculateGpa([${test.input.join(', ')}])`, () => {
			const output = calculateGpa(test.input);
			expect(output).toStrictEqual(test.output);
		});
	}
});