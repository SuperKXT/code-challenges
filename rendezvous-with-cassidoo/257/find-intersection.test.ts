import { findIntersection } from './find-intersection';

import { arrayToLinkedList } from '~/helpers/linked-list';


const ARRAY_A = [1, 4, 5, 6];
const ARRAY_B = [2, 3, 4, 5, 6];
const ARRAY_C = [9, 1, 4, 5, 6, 12];

const LIST_A = arrayToLinkedList(ARRAY_A);
const LIST_B = arrayToLinkedList(ARRAY_B);
const LIST_C = arrayToLinkedList(ARRAY_C);
const SOLUTION_NODE = LIST_A.head?.next;

describe('arrays', () => {
	it('should find intersection [1, 2]', () => {
		const intersection = findIntersection(ARRAY_A, ARRAY_B);
		expect(intersection).toStrictEqual([1, 2]);
	});

	it('should not find any intersection', () => {
		const intersection = findIntersection(ARRAY_A, ARRAY_C);
		expect(intersection).toBeNull();
	});
});

describe('linked lists', () => {
	it('should find intersection', () => {
		const node = findIntersection(LIST_A.head, LIST_B.head);
		expect(node).toBe(SOLUTION_NODE);
	});

	it('should not find any intersection for non-intersecting lists', () => {
		const node = findIntersection(LIST_A.head, LIST_C.head);
		expect(node).toBeNull();
	});

	it('should not find any intersection with node', () => {
		const node = findIntersection(LIST_A.head, null);
		expect(node).toBeNull();
	});
});
