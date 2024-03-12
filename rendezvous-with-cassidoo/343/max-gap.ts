export const maxGap = <const nums extends number[]>(nums: nums): number => {
	let max = 0;
	for (let idx = 1; idx < nums.length; idx++) {
		const curr = nums[idx] as number;
		const last = nums[idx - 1] as number;
		max = Math.max(max, curr - last);
	}
	return max as never;
};
