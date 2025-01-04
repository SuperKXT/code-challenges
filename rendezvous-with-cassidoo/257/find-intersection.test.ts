import { findIntersection } from "./find-intersection.js";

import { arrayToLinkedList } from "../../helpers/linked-list.helpers.js";

const ARRAY_A = [1, 4, 5, 6];
const ARRAY_B = [2, 3, 4, 5, 6];
const ARRAY_C = [9, 1, 4, 5, 6, 12];

const LIST_A = arrayToLinkedList(ARRAY_A);
const LIST_B = arrayToLinkedList(ARRAY_B);
const LIST_C = arrayToLinkedList(ARRAY_C);
const SOLUTION_NODE = LIST_A.head?.next;

test("array test case 1 for findIntersection", () => {
	const intersection = findIntersection(ARRAY_A, ARRAY_B);
	expect(intersection).toStrictEqual([1, 2]);
});

test("array test case 2 for findIntersection", () => {
	const intersection = findIntersection(ARRAY_A, ARRAY_C);
	expect(intersection).toBeNull();
});

test("linked list test 1 for findIntersection", () => {
	const node = findIntersection(LIST_A.head, LIST_B.head);
	expect(node).toBe(SOLUTION_NODE);
});

test("linked list test 2 for findIntersection", () => {
	const node = findIntersection(LIST_A.head, LIST_C.head);
	expect(node).toBeNull();
});

test("linked list test 3 for findIntersection", () => {
	const node = findIntersection(LIST_A.head, null);
	expect(node).toBeNull();
});
