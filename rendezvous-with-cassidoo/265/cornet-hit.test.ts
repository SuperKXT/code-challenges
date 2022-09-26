import { cornerHit, XY } from './cornet-hit';

interface Test {
	boxSize: XY,
	initialPosition: XY,
	screenSize: XY,
	result: boolean,
}

const tests: Test[] = [
	{
		boxSize: [5, 5],
		initialPosition: [0, 0],
		screenSize: [100, 100],
		result: true,
	},
	{
		boxSize: [5, 5],
		initialPosition: [45, 70],
		screenSize: [400, 200],
		result: false,
	},
];

describe('testing cornerHit', () => {
	it.each(tests)('should return if the box hits the corner for given input', (test) => {
		const result = cornerHit(test.boxSize, test.initialPosition, test.screenSize);
		expect(result).toStrictEqual(test.result);
	});
});