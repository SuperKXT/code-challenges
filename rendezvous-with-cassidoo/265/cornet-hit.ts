export type XY = [number, number];
export const cornerHit = (
	boxSize: XY,
	initialPosition: XY,
	screenSize: XY
): boolean => {
	const [width, height] = boxSize;
	const [x, y] = initialPosition;
	const [screenCornerX, screenCornerY] = screenSize;
	const [logoCornerX, logoCornerY] = [x + width, y + height];
	return screenCornerX - logoCornerX === screenCornerY - logoCornerY;
};