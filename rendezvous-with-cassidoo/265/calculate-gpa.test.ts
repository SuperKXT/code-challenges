import { calculateGpa, GradePoint } from './calculate-gpa';

interface Test {
	input: GradePoint[];
	output: number;
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
	it.each(tests)('should return correct gpa for the given input', (test) => {
		const output = calculateGpa(test.input);
		expect(output).toStrictEqual(test.output);
	});
});
