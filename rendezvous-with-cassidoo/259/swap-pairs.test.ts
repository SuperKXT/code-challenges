
import { linkedListToArray } from '~/helpers/array';
import { arrayToLinkedList } from '~/helpers/linked-list';

import {
	swapArrayPairsWithLoop,
	swapArrayPairsWithRecursion,
	swapArrayPairsWithRegex,
	swapLinkedListPairs,
} from './swap-pairs';


const ARRAY_1 = [1, 2, 3, 4];
const ARRAY_2: number[] = [];
const ARRAY_3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const LIST_1 = arrayToLinkedList(ARRAY_1);
const LIST_2 = arrayToLinkedList(ARRAY_2);
const LIST_3 = arrayToLinkedList(ARRAY_3);

const SOLUTION_1 = [2, 1, 4, 3];
const SOLUTION_2 = ARRAY_2;
const SOLUTION_3 = [2, 1, 4, 3, 6, 5, 8, 7, 9];

describe('swap array pairs with regex', () => {
	it('should return [2, 1, 4, 3] for [1, 2, 3, 4]', () => {
		const solution = swapArrayPairsWithRegex(ARRAY_1);
		expect(solution).toStrictEqual(SOLUTION_1);
	});

	it('should return [] for []', () => {
		const solution = swapArrayPairsWithRegex(ARRAY_2);
		expect(solution).toStrictEqual(SOLUTION_2);
	});

	it('should return [2, 1, 4, 3, 6, 5, 8, 7, 9] for [1, 2, 3, 4, 5, 6, 7, 8, 9]', () => {
		const solution = swapArrayPairsWithRegex(ARRAY_3);
		expect(solution).toStrictEqual(SOLUTION_3);
	});
});

describe('swap array pairs with recursion', () => {
	it('should return [2, 1, 4, 3] for [1, 2, 3, 4]', () => {
		const solution = swapArrayPairsWithRecursion(ARRAY_1);
		expect(solution).toStrictEqual(SOLUTION_1);
	});

	it('should return [] for []', () => {
		const solution = swapArrayPairsWithRecursion(ARRAY_2);
		expect(solution).toStrictEqual(SOLUTION_2);
	});

	it('should return [2, 1, 4, 3, 6, 5, 8, 7, 9] for [1, 2, 3, 4, 5, 6, 7, 8, 9]', () => {
		const solution = swapArrayPairsWithRecursion(ARRAY_3);
		expect(solution).toStrictEqual(SOLUTION_3);
	});
});

describe('swap array pairs with loop', () => {
	it('should return [2, 1, 4, 3] for [1, 2, 3, 4]', () => {
		const solution = swapArrayPairsWithLoop(ARRAY_1);
		expect(solution).toStrictEqual(SOLUTION_1);
	});

	it('should return [] for []', () => {
		const solution = swapArrayPairsWithLoop(ARRAY_2);
		expect(solution).toStrictEqual(SOLUTION_2);
	});

	it('should return [2, 1, 4, 3, 6, 5, 8, 7, 9] for [1, 2, 3, 4, 5, 6, 7, 8, 9]', () => {
		const solution = swapArrayPairsWithLoop(ARRAY_3);
		expect(solution).toStrictEqual(SOLUTION_3);
	});
});

describe('swap linked list pairs', () => {
	it('should return swappedList for list1', () => {
		const solution = swapLinkedListPairs(LIST_1);
		expect(linkedListToArray(solution)).toStrictEqual(SOLUTION_1);
	});

	it('should return swappedList for list2', () => {
		const solution = swapLinkedListPairs(LIST_2);
		expect(linkedListToArray(solution)).toStrictEqual(SOLUTION_2);
	});

	it('should return swappedList for list3', () => {
		const solution = swapLinkedListPairs(LIST_3);
		expect(linkedListToArray(solution)).toStrictEqual(SOLUTION_3);
	});
});
