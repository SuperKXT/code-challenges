import { largestIsland } from './largest-island.js';

test('testing largestIsland against test 1', () => {
	const arr: (0 | 1)[][] = [
		[0, 1, 1, 1, 0, 0, 0, 1, 1],
		[0, 1, 1, 1, 0, 1, 0, 0, 0],
		[0, 1, 0, 0, 0, 0, 0, 1, 0],
		[0, 0, 1, 1, 0, 1, 1, 1, 0],
	];
	const result = largestIsland(arr);
	const expected = 7;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
