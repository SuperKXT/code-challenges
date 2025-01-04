import type { LinkedList, LinkedListNode } from "./linked-list.helpers.js";

export const areArraysEqual = <Type extends unknown[]>(
	first: Type,
	second: Type,
): boolean => {
	if (first.length !== second.length) return false;

	for (let index = 0; index < first.length; index++)
		if (first[index] !== second[index]) return false;

	return true;
};

type _LinkedListToArray<T extends NonNullable<LinkedListNode>> =
	T["next"] extends NonNullable<LinkedListNode>
		? [T["value"], ..._LinkedListToArray<T["next"]>]
		: [T["value"]];

type LinkedListToArray<T extends LinkedList<unknown>> =
	T["head"] extends NonNullable<LinkedListNode>
		? _LinkedListToArray<T["head"]>
		: [];

export const linkedListToArray = <const List extends LinkedList<unknown>>(
	list: List,
): LinkedListToArray<List> => {
	const array = [];
	let node = list.head;
	while (node) {
		array.push(node.value);
		node = node.next;
	}
	return array as LinkedListToArray<List>;
};

export const inPlaceInsertToSortedArray = (
	arr: number[],
	value: number,
): void => {
	let low = 0;
	let high = arr.length - 1;
	let idx = 0;
	while (true) {
		if (low >= high) {
			idx = high;
			break;
		}
		const mid = Math.floor((low + high) / 2);
		const midVal = arr[mid] as number;
		if (midVal === value) {
			idx = mid;
			break;
		} else if (midVal < value) {
			low = mid + 1;
		} else {
			high = mid - 1;
		}
	}
	const idxVal = arr[idx] as number;
	arr.splice(idxVal > value ? idx : idx + 1, 0, value);
};

export const filterInPlace = <T>(
	array: T[],
	check: (row: NoInfer<T>) => boolean,
): number => {
	let removed = 0;
	for (let i = 0; i < array.length; i++) {
		const shouldKeep = check(array[i] as T);
		if (shouldKeep) continue;
		removed++;
		array.splice(i, 1);
		i -= 1;
	}
	return removed;
};
