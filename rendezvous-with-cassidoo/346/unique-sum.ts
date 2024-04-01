export const uniqueSum = (arr: number[]): number => {
	let sum = 0;
	for (const num of arr) {
		const uniqueDigits = new Set(num.toString().split(''));
		if (uniqueDigits.size !== num.toString().length) continue;
		sum += num;
	}
	return sum;
};
