import { calculateGpa } from './calculate-gpa.js';

import type { GradePoint } from './calculate-gpa.js';

type Test = {
	input: GradePoint[];
	output: number;
};

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

test.each(TESTS)('testing calculateGpa', ({ input, output }) => {
	const response = calculateGpa(input);
	expect(response).toStrictEqual(output);
});
