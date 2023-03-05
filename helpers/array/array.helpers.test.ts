import type { LinkedList } from '~/helpers/linked-list';

import { areArraysEqual, linkedListToArray } from './array.helpers';

interface EqualityTest {
	first: any[];
	second: any[];
	areEqual: boolean;
}

interface ToArrayTest<Type> {
	array: Type[];
	list: LinkedList<Type>;
}

const equalityTests: EqualityTest[] = [
	{
		areEqual: true,
		first: [1, 2, 3, 4],
		second: [1, 2, 3, 4],
	},
	{
		areEqual: false,
		first: [1, 2, 3, 4],
		second: ['1', '2', '3', '4'],
	},
	{
		areEqual: false,
		first: [1, 2, 3],
		second: [1],
	},
];

const toArrayTests: ToArrayTest<number>[] = [
	{
		array: [1, 2, 3],
		list: {
			head: { next: { next: { next: null, value: 3 }, value: 2 }, value: 1 },
		},
	},
	{
		array: [],
		list: { head: null },
	},
];

describe('array equality helper', () => {
	it.each(equalityTests)(
		'should calculate if the two arrays are equal',
		({ first, second, areEqual }) => {
			const response = areArraysEqual(first, second);
			expect(response).toStrictEqual(areEqual);
		}
	);
});

describe('linked list to array helper', () => {
	it.each(toArrayTests)(
		'should return array by given linked list',
		({ list, array }) => {
			const response = linkedListToArray(list);
			expect(response).toStrictEqual(array);
		}
	);
});
