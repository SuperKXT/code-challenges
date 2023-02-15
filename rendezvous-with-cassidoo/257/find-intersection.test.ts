import { arrayToLinkedList } from '~/helpers/linked-list';

import { findIntersection } from './find-intersection';

const arrayA = [1, 4, 5, 6];
const arrayB = [2, 3, 4, 5, 6];
const arrayC = [9, 1, 4, 5, 6, 12];

const listA = arrayToLinkedList(arrayA);
const listB = arrayToLinkedList(arrayB);
const listC = arrayToLinkedList(arrayC);
const solutionNode = listA.head?.next;

describe('arrays', () => {
	it('should find intersection [1, 2]', () => {
		const intersection = findIntersection(arrayA, arrayB);
		expect(intersection).toStrictEqual([1, 2]);
	});

	it('should not find any intersection', () => {
		const intersection = findIntersection(arrayA, arrayC);
		expect(intersection).toBeNull();
	});
});

describe('linked lists', () => {
	it('should find intersection', () => {
		const node = findIntersection(listA.head, listB.head);
		expect(node).toBe(solutionNode);
	});

	it('should not find any intersection for non-intersecting lists', () => {
		const node = findIntersection(listA.head, listC.head);
		expect(node).toBeNull();
	});

	it('should not find any intersection with node', () => {
		const node = findIntersection(listA.head, null);
		expect(node).toBeNull();
	});
});
