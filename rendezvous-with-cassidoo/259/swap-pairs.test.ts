import {
	swapArrayPairsWithLoop,
	swapArrayPairsWithRecursion,
	swapArrayPairsWithRegex,
	swapLinkedListPairs,
} from "./swap-pairs.js";

import { linkedListToArray } from "../../helpers/array.helpers.js";
import { arrayToLinkedList } from "../../helpers/linked-list.helpers.js";

const ARRAY_1 = [1, 2, 3, 4];
const ARRAY_2: number[] = [];
const ARRAY_3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const LIST_1 = arrayToLinkedList(ARRAY_1);
const LIST_2 = arrayToLinkedList(ARRAY_2);
const LIST_3 = arrayToLinkedList(ARRAY_3);

const SOLUTION_1 = [2, 1, 4, 3];
const SOLUTION_2 = ARRAY_2;
const SOLUTION_3 = [2, 1, 4, 3, 6, 5, 8, 7, 9];

test("testing swapArrayPairsWithRegex for array 1", () => {
	const solution = swapArrayPairsWithRegex(ARRAY_1);
	expect(solution).toStrictEqual(SOLUTION_1);
});

test("testing swapArrayPairsWithRegex for array 2", () => {
	const solution = swapArrayPairsWithRegex(ARRAY_2);
	expect(solution).toStrictEqual(SOLUTION_2);
});

test("testing swapArrayPairsWithRegex for array 3", () => {
	const solution = swapArrayPairsWithRegex(ARRAY_3);
	expect(solution).toStrictEqual(SOLUTION_3);
});

test("testing swapArrayPairsWithRecursion for array 1", () => {
	const solution = swapArrayPairsWithRecursion(ARRAY_1);
	expect(solution).toStrictEqual(SOLUTION_1);
});

test("testing swapArrayPairsWithRecursion for array 2", () => {
	const solution = swapArrayPairsWithRecursion(ARRAY_2);
	expect(solution).toStrictEqual(SOLUTION_2);
});

test("testing swapArrayPairsWithRecursion for array 3", () => {
	const solution = swapArrayPairsWithRecursion(ARRAY_3);
	expect(solution).toStrictEqual(SOLUTION_3);
});

test("testing swapArrayPairsWithLoop for array 1", () => {
	const solution = swapArrayPairsWithLoop(ARRAY_1);
	expect(solution).toStrictEqual(SOLUTION_1);
});

test("testing swapArrayPairsWithLoop for array 2", () => {
	const solution = swapArrayPairsWithLoop(ARRAY_2);
	expect(solution).toStrictEqual(SOLUTION_2);
});

test("testing swapArrayPairsWithLoop for array 3", () => {
	const solution = swapArrayPairsWithLoop(ARRAY_3);
	expect(solution).toStrictEqual(SOLUTION_3);
});

test("testing swapLinkedListPairs for list 1", () => {
	const solution = swapLinkedListPairs(LIST_1);
	expect(linkedListToArray(solution)).toStrictEqual(SOLUTION_1);
});

test("testing swapLinkedListPairs for list 2", () => {
	const solution = swapLinkedListPairs(LIST_2);
	expect(linkedListToArray(solution)).toStrictEqual(SOLUTION_2);
});

test("testing swapLinkedListPairs for list 3", () => {
	const solution = swapLinkedListPairs(LIST_3);
	expect(linkedListToArray(solution)).toStrictEqual(SOLUTION_3);
});
