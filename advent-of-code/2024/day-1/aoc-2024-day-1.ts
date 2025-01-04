import { inPlaceInsertToSortedArray } from "../../../helpers/array.helpers.js";

export const aoc2024Day1 = (input: string) => {
	const leftArr: number[] = [];
	const rightArr: number[] = [];
	const rightCountMap = new Map<number, number>();
	for (const row of input.split("\n")) {
		const split = row.trim().split(/\s+/u);
		const left = Number(split[0]);
		const right = Number(split[1]);
		if (!left || !right) continue;
		inPlaceInsertToSortedArray(leftArr, left);
		inPlaceInsertToSortedArray(rightArr, right);
		rightCountMap.set(right, (rightCountMap.get(right) ?? 0) + 1);
	}
	let distance = 0;
	let similarity = 0;
	for (let i = 0; i < leftArr.length; i++) {
		const leftVal = leftArr[i] as number;
		const rightVal = rightArr[i] as number;
		const rightCount = rightCountMap.get(leftVal) ?? 0;
		distance += Math.abs(leftVal - rightVal);
		similarity += leftVal * rightCount;
	}
	return { distance, similarity };
};
