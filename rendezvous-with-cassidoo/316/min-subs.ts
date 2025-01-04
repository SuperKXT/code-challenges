export const minSubs = (input: number[], count: number): number[] => {
	let maxSum: number = Infinity;
	let result: number[] = [];
	for (let i = 0; i < input.length - count; i++) {
		const curr = input.slice(i, i + count);
		const currSum = curr.reduce((sum, num) => sum + num);
		if (currSum < maxSum) {
			maxSum = currSum;
			result = curr;
		}
	}
	return result;
};
