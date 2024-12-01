import { inPlaceInsertToSortedArray } from '../../../helpers/array.helpers.js';

export const compareLists = (input: string): number => {
	const leftArr: number[] = [];
	const rightArr: number[] = [];
	for (const row of input.split('\n')) {
		const split = row.trim().split(/\s+/u);
		const left = Number(split[0]);
		const right = Number(split[1]);
		if (!left || !right) continue;
		inPlaceInsertToSortedArray(leftArr, left);
		inPlaceInsertToSortedArray(rightArr, right);
	}
	let distance = 0;
	for (let i = 0; i < leftArr.length; i++) {
		distance += Math.abs((leftArr[i] as number) - (rightArr[i] as number));
	}
	return distance;
};
