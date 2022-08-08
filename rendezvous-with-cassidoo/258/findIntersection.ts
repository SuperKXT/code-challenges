import { LinkListNode } from '@helpers/linked-list';

export type Intersection = [number, number] | LinkListNode<number>;

const areArraysEqual = (first: unknown[], second: unknown[]) => {
	if (first.length !== second.length) return false;
	for (let index = 0; index < first.length; index++) {
		if (first[index] !== second[index]) return false;
	}
	return true;
};

const findIntersection = <Type extends LinkListNode<number> | number[]>(
	paramA: Type,
	paramB: Type
): Intersection | null => {

	if (!Array.isArray(paramA)) {

		let nodeA = paramA as LinkListNode<number>;

		while (nodeA) {
			let nodeB = paramB as LinkListNode<number>;
			while (nodeB) {
				if (
					JSON.stringify(nodeA)
					=== JSON.stringify(nodeB)
				) return nodeA;
				nodeB = nodeB.next ?? null;
			}
			nodeA = nodeA.next;
		}
		return null;
	}
	else {

		const reversedA = [...(paramA as number[])].reverse();
		const reversedB = [...(paramB as number[])].reverse();

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

	}

};

export {
	areArraysEqual,
	findIntersection,
};