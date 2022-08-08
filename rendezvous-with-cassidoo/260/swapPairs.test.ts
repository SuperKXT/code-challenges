import { linkedListToArray } from '@helpers/array';
import { arrayToLinkedList } from '@helpers/linked-list';
import { swapPairsArray, swapPairsLinkList } from './swapPairs';

const array1 = [1, 2, 3];
const array2: number[] = [];
const array3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const list1 = arrayToLinkedList(array1);
const list2 = arrayToLinkedList(array2);
const list3 = arrayToLinkedList(array3);

const solution1 = [2, 1, 3];
const solution2 = array2;
const solution3 = [2, 1, 4, 3, 6, 5, 8, 7, 9];

describe('swap array pairs', () => {

	it('should return [2, 1, 4, 3] for [1, 2, 3, 4]', () => {
		const solution = swapPairsArray(array1);
		expect(solution).toStrictEqual(solution1);
	});

	it('should return [] for []', () => {
		const solution = swapPairsArray(array2);
		expect(solution).toStrictEqual(solution2);
	});

	it('should return [2, 1, 4, 3, 6, 5, 8, 7, 9] for [1, 2, 3, 4, 5, 6, 7, 8, 9]', () => {
		const solution = swapPairsArray(array3);
		expect(solution).toStrictEqual(solution3);
	});

});

describe('swap linked list pairs', () => {

	it('should return swappedList for list1', () => {
		const solution = swapPairsLinkList(list1);
		expect(linkedListToArray(solution)).toStrictEqual(solution1);
	});

	it('should return swappedList for list2', () => {
		const solution = swapPairsLinkList(list2);
		expect(linkedListToArray(solution)).toStrictEqual(solution2);
	});

	it('should return swappedList for list3', () => {
		const solution = swapPairsLinkList(list3);
		expect(linkedListToArray(solution)).toStrictEqual(solution3);
	});

});