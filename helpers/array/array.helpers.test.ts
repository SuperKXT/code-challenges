import { arrayToLinkedList, LinkedList } from '@helpers/linked-list';
import {
	areArraysEqual,
	linkedListToArray
} from './array.helpers';

interface EqualityTest {
	first: any[],
	second: any[],
	areEqual: boolean,
}

interface ToLinkedListTest<Type> {
	array: Type[],
	list: LinkedList<Type>,
}

const equalityTests: EqualityTest[] = [
	{
		first: [1, 2, 3, 4],
		second: [1, 2, 3, 4],
		areEqual: true,
	},
	{
		first: [1, 2, 3, 4],
		second: ['1', '2', '3', '4'],
		areEqual: false,
	},
	{
		first: [1, 2, 3],
		second: [1],
		areEqual: false,
	},
];

const toLinkedListTests: ToLinkedListTest<number>[] = [
	{
		array: [1, 2, 3],
		list: { head: { value: 1, next: { value: 2, next: { value: 3, next: null, } } } },
	},
	{
		array: [],
		list: { head: null },
	},
];

describe('array equality helper', () => {

	for (const test of equalityTests) {
		it(`should return ${test.areEqual} for [${test.first}] and [${test.second}]`, () => {
			const areEqual = areArraysEqual(test.first, test.second);
			expect(areEqual).toStrictEqual(test.areEqual);
		});
	}

});

describe('array to linked list helper', () => {

	for (const test of toLinkedListTests) {
		it(`should return ${test.list} for [${test.array}]`, () => {
			const list = arrayToLinkedList(test.array);
			expect(JSON.stringify(list)).toStrictEqual(JSON.stringify(test.list));
		});
	}

});