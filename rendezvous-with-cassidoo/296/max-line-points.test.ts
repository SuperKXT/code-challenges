import { maxPointsOnLine } from "./max-line-points.js";

type Test = {
	input: [number, number][];
	output: number;
};

const tests: Test[] = [
	{
		input: [
			[1, 1],
			[3, 2],
			[5, 3],
			[4, 1],
			[2, 3],
			[1, 4],
		],
		output: 4,
	},
	{
		input: [
			[1, 1],
			[2, 2],
			[3, 3],
		],
		output: 3,
	},
	{
		input: [
			[1, 1],
			[1, 2],
			[1, 3],
			[1, 4],
			[1, 9],
		],
		output: 5,
	},
];

test.each(tests)(
	"should return the maximum points in a straight line",
	({ input, output }) => {
		const response = maxPointsOnLine(input);
		expect(response).toBe(output);
	},
);
