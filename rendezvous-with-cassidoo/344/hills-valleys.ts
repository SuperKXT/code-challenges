export const hills = (arr: number[]) => {
	let count = 0;
	let uphill = false;
	for (let i = 0; i < arr.length - 1; i++) {
		const curr = arr[i] as number;
		const next = arr[i + 1] as number;
		uphill ||= curr < next;
		if (curr > next && uphill) {
			count++;
			uphill = false;
		}
	}
	return count;
};

export const valleys = (arr: number[]) => {
	let count = 0;
	let downhill = false;
	for (let i = 0; i < arr.length - 1; i++) {
		const curr = arr[i] as number;
		const next = arr[i + 1] as number;
		downhill ||= curr > next;
		if (curr < next && downhill) {
			count++;
			downhill = false;
		}
	}
	return count;
};
