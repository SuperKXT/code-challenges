export type XY = [number, number];
export const cornerHit = (
	boxSize: XY,
	initialPosition: XY,
	screenSize: XY,
): boolean => {
	const [width, height] = boxSize;
	const [posX, posY] = initialPosition;
	const [screenCornerX, screenCornerY] = screenSize;
	const [logoCornerX, logoCornerY] = [posX + width, posY + height];
	return screenCornerX - logoCornerX === screenCornerY - logoCornerY;
};
