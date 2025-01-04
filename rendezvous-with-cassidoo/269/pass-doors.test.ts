import { passDoors } from "./pass-doors.js";

type Test = {
	input: [number, number];
	output: number;
};

const TESTS: Test[] = [
	{ input: [7, 3], output: 4 },
	{ input: [8, 4], output: 6 },
	{ input: [2, 0], output: 0 },
	{ input: [3, 1], output: 3 },
];

test.each(TESTS)("testing passDoors", ({ input, output }) => {
	const response = passDoors(...input);
	expect(response).toStrictEqual(output);
});
