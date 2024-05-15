/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const maxProduct = (arr: number[]): number => {
	const sorted = arr.sort((a, b) => Math.abs(a) - Math.abs(b));
	let nums: [number | undefined, number | undefined, number | undefined] = [
		undefined,
		undefined,
		undefined,
	];
	let nextNum = 0;
	const negatives: [number | undefined, number | undefined] = [
		undefined,
		undefined,
	];
	let nextNegative = 0;
	for (let idx = 0; idx < sorted.length; idx++) {
		const num = sorted[idx] as number;
		if (num > -1) {
			if (
				nextNegative === 2 &&
				nextNum === 2 &&
				nums[0]! * nums[1]! * num < nums[0]! * negatives[0]! * negatives[1]!
			) {
				nums = [nums[0], negatives[0], negatives[1]];
				break;
			}
			nums[nextNum] = num;
			nextNum++;
		} else if (nextNegative > 0 && nextNum < 2) {
			nums[nextNum] = num;
			nums[nextNum + 1] = num;
			nextNum += 2;
		} else if (idx === arr.length - 1) {
			nums[nextNum] = num;
			nextNum++;
		} else {
			negatives[nextNegative] = num;
			nextNegative++;
		}
		if (nextNum === 3) break;
	}
	if (!nums[0] || !nums[1] || !nums[2]) return 0;
	return nums[0] * nums[1] * nums[2];
};
