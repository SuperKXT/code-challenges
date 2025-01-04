export const getStarAngles = (points: number) => {
	if (points < 3) throw new Error("stars must have at least 3 sides!");
	return points % 2 === 0 ? 360 : 180;
};
