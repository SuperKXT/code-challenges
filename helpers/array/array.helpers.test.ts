import { LinkedList } from '~/helpers/linked-list';

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

const toArrayTests: ToArrayTest<number>[] = [
	{
		array: [1, 2, 3],
		list: {
			head: { value: 1, next: { value: 2, next: { value: 3, next: null } } },
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
		(test) => {
			const areEqual = areArraysEqual(test.first, test.second);
			expect(areEqual).toStrictEqual(test.areEqual);
		}
	);
});

describe('linked list to array helper', () => {
	it.each(toArrayTests)('should return array by given linked list', (test) => {
		const array = linkedListToArray(test.list);
		expect(array).toStrictEqual(test.array);
	});
});
