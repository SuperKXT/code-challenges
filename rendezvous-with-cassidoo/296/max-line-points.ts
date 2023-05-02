export const maxPointsOnLine = (points: [number, number][]): number => {
	let max = 0;
	for (const [x1, y1] of points) {
		const lines = new Map<number, number>();
		for (const [x2, y2] of points) {
			if (x1 === x2 && y1 === y2) continue;
			const slope = x2 === x1 ? Infinity : (y2 - y1) / (x2 - x1);
			const length = (lines.get(slope) ?? 1) + 1;
			lines.set(slope, length);
			if (length > max) max = length;
		}
	}
	return max;
};
