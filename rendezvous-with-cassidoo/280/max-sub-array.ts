interface Max {
	subArray: number[],
	sum: number,
}

export const maxSubArray = (
	array: number[],
	length: number
): number[] => {
	const difference = array.length - length;
	if (difference < 1) return array;
	const max: Max = {
		subArray: [],
		sum: 0,
	};
	for (let index = 0; index <= difference; index++) {
		const subArray = array.slice(index, index + length);
		const sum = subArray.reduce((sum, num) => sum += num);
		if (sum > max.sum) {
			max.subArray = subArray;
			max.sum = sum;
		}
	}
	return max.subArray;
};
