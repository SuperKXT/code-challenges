import { subGridSum } from './sub-grid-sum';

const grid = [
	[6, 9, -7, 3],
	[8, -1, -6, -4],
	[2, -7, 7, -7],
	[-1, 4, 7, 9],
];

describe('testing subGridSum', () => {
	it('should return the correct sum for example 1', () => {
		expect(subGridSum(grid, [-1, 8, -7, 2])).toBe(2);
	});
	it('should return the correct sum for example 2', () => {
		expect(subGridSum(grid, [6, 3, 2, -7])).toBe(3);
	});
});
