import type { LinkedList, LinkedListNode } from './linked-list.types';

export const arrayToLinkedList = <Type>(array: Type[]) => {
	const list: LinkedList<Type> = {
		head: null,
	};
	let lastNode: LinkedListNode<Type> = null;

	for (const item of array) {
		const node: LinkedListNode<Type> = {
			value: item,
			next: null,
		};

		if (!list.head) {
			list.head = node;
			lastNode = list.head;
		} else if (lastNode) {
			lastNode.next = node;
			lastNode = node;
		}
	}

	return list;
};
