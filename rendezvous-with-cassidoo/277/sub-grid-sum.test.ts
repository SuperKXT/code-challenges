import { subGridSum, subGridSumError } from './sub-grid-sum';

const grid = [
	[6, 9, -7, 3],
	[8, -1, -6, -4],
	[2, -7, 7, -7],
	[-1, 4, 7, 9],
];

describe('testing subGridSum', () => {
	it('should return the correct sum for given marks', () => {
		expect(subGridSum(grid, [-1, 8, -7, 2])).toBe(2);
		expect(subGridSum(grid, [6, 3, 2, -7])).toBe(3);
		expect(subGridSum(grid, [6, 3, -1, 9])).toBe(22);
	});
	it('should throw appropriate error if marks are invalid', () => {
		expect(() =>
			subGridSum(grid, [6, 10, 11, 12])
		).toThrow(subGridSumError);
		expect(() =>
			subGridSum(grid, [6, 6, -1, 9])
		).toThrow(subGridSumError);
		expect(() =>
			subGridSum(grid, [6, 6, 6, 6])
		).toThrow(subGridSumError);
	});
});
