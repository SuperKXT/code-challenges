export const rotatedArray = (input: number[]): number => {
	const array = [...input];
	let rotated = 0;
	let idx = 0;
	while (idx < array.length - 1) {
		const curr = array[idx] as number;
		const next = array[idx + 1] as number;
		if (curr > next) {
			idx = 0;
			const removed = array.splice(0, 1);
			array.push(...removed);
			rotated++;
		} else {
			idx++;
		}
	}
	return rotated;
};
