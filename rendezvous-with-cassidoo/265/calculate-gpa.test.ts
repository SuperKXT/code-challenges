import { calculateGpa } from './calculate-gpa';
import type { GradePoint } from './calculate-gpa';

interface Test {
	input: GradePoint[];
	output: number;
}

const TESTS: Test[] = [
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
	it.each(TESTS)(
		'should return correct gpa for the given input',
		({ input, output }) => {
			const response = calculateGpa(input);
			expect(response).toStrictEqual(output);
		}
	);
});
