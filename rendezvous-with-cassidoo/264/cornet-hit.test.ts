import { cornerHit } from './cornet-hit';
import type { XY } from './cornet-hit';

interface Test {
	boxSize: XY;
	initialPosition: XY;
	screenSize: XY;
	result: boolean;
}

const TESTS: Test[] = [
	{
		boxSize: [5, 5],
		initialPosition: [0, 0],
		result: true,
		screenSize: [100, 100],
	},
	{
		boxSize: [5, 5],
		initialPosition: [45, 70],
		result: false,
		screenSize: [400, 200],
	},
];

describe('testing cornerHit', () => {
	it.each(TESTS)(
		'should return if the box hits the corner for given input',
		(testCase) => {
			const result = cornerHit(
				testCase.boxSize,
				testCase.initialPosition,
				testCase.screenSize
			);
			expect(result).toStrictEqual(testCase.result);
		}
	);
});
