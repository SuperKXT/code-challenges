const areArraysEqual = (first: unknown[], second: unknown[]) => {
	if (first.length !== second.length) return false;
	for (let index = 0; index < first.length; index++) {
		if (first[index] !== second[index]) return false;
	}
	return true;
};

export type LinkListNode = null | {
	value: number,
	next: LinkListNode,
};
export interface LinkList {
	head: LinkListNode,
}
export type Intersection = [number, number] | LinkListNode;

const arrayToLinkedList = (array: number[]) => {
	const list: LinkList = {
		head: null,
	};
	let lastNode: LinkListNode = null;
	for (const item of array) {
		const node: LinkListNode = {
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

const findIntersection = <Type extends LinkListNode | number[]>(
	paramA: Type,
	paramB: Type
): Intersection | null => {

	if (!Array.isArray(paramA)) {

		let nodeA = paramA as LinkListNode;
		let nodeB = paramB as LinkListNode;

		while (nodeA) {
			while (nodeB) {
				if (nodeA === nodeB) return nodeA;
				nodeB = nodeB.next;
			}
			nodeA = nodeA.next;
		}
		return null;
	}

	const reversedA = (paramA as number[]).reverse();
	const reversedB = (paramB as number[]).reverse();

	for (let index = 0; index < reversedA.length; index++) {

		const subA = reversedA.slice(0, reversedA.length - index);
		const subB = reversedB.slice(0, reversedA.length - index);

		if (areArraysEqual(subA, subB)) {
			return [
				index,
				reversedB.length - subB.length,
			];
		}

	}

	return null;

};

const arrayA = [1, 4, 5, 6];
const arrayB = [2, 3, 4, 5, 6];

const listA = arrayToLinkedList(arrayA);
const listB = arrayToLinkedList(arrayB);
console.log(findIntersection(arrayA, arrayB));
console.log(findIntersection(listA.head, listB.head));

export default findIntersection;