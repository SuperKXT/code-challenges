import { maxPointsOnLine } from './max-line-points';

test('should return the maximum points in a straight line', async () => {
	const response = await maxPointsOnLine([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]);
	expect(response).toBe(4);
});
