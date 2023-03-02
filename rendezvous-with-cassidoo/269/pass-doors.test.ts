import { passDoors } from './pass-doors';

interface Test {
	input: [number, number];
	output: number;
}

const tests: Test[] = [
	{ input: [7, 3], output: 4 },
	{ input: [8, 4], output: 6 },
	{ input: [2, 0], output: 0 },
	{ input: [3, 1], output: 3 },
];

describe('testing passDoors', () => {
	it.each(tests)(
		'should return number of open doors after given passes',
		({ input, output }) => {
			const response = passDoors(...input);
			expect(response).toStrictEqual(output);
		}
	);
});
