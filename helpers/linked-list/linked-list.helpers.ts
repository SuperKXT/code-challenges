import { LinkList, LinkListNode } from './linked-list.types';

export const arrayToLinkedList = <Type>(array: Type[]) => {

	const list: LinkList<Type> = {
		head: null,
	};
	let lastNode: LinkListNode<Type> = null;

	for (const item of array) {
		const node: LinkListNode<Type> = {
			value: item,
			next: null,
		};

		if (!list.head) {
			list.head = node;
			lastNode = list.head;
		}
		else if (lastNode) {
			lastNode.next = node;
			lastNode = node;
		}

	}
	return list;

};