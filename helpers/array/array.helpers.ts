import { LinkedList } from '@helpers/linked-list';

export const areArraysEqual = <Type extends any[]>(
	first: Type,
	second: Type
): boolean => {
	if (first.length !== second.length) return false;
	for (let index = 0; index < first.length; index++) {
		if (first[index] !== second[index]) return false;
	}
	return true;
};

export const linkedListToArray = <Type>(
	list: LinkedList<Type>
): Type[] => {
	const array: Type[] = [];
	let node = list.head;
	while (node) {
		array.push(node.value);
		node = node.next;
	}
	return array;
};