type tuple<
	size extends number,
	res extends unknown[] = [],
> = res["length"] extends size ? res : tuple<size, [...res, 1]>;

type subtract<first extends number, second extends number> =
	tuple<second> extends [...tuple<first>, ...infer rest] ? rest["length"] : 0;

type MaxGap<nums extends number[], max extends number = 0> = nums extends [
	infer first extends number,
	infer second extends number,
	...infer rest extends number[],
]
	? subtract<first, second> extends infer curr extends number
		? MaxGap<rest, subtract<max, curr> extends 0 ? max : curr>
		: never
	: max;

export const maxGap = <const nums extends number[]>(
	nums: nums,
): MaxGap<nums> => {
	let max = 0;
	for (let idx = 1; idx < nums.length; idx++) {
		const curr = nums[idx] as number;
		const last = nums[idx - 1] as number;
		max = Math.max(max, curr - last);
	}
	return max as never;
};
