import type { LinkedList, LinkedListNode } from '~/helpers/linked-list';

export const areArraysEqual = <Type extends any[]>(
	first: Type,
	second: Type,
): boolean => {
	if (first.length !== second.length) return false;

	for (let index = 0; index < first.length; index++)
		if (first[index] !== second[index]) return false;

	return true;
};

type _LinkedListToArray<T extends NonNullable<LinkedListNode>> =
	T['next'] extends NonNullable<LinkedListNode>
		? [T['value'], ..._LinkedListToArray<T['next']>]
		: [T['value']];

type LinkedListToArray<T extends LinkedList<any>> =
	T['head'] extends NonNullable<LinkedListNode>
		? _LinkedListToArray<T['head']>
		: [];

export const linkedListToArray = <const List extends LinkedList<any>>(
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
