import { getStarAngles } from './n-pointed-star';

test('should return the angles of the star with n sides', async () => {
	const response = await getStarAngles(1);
	expect(response).toBe(0);
});
