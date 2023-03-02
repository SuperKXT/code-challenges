import { arrayToLinkedList } from './linked-list.helpers';

import type { LinkedList } from './linked-list.types';

interface Test<Type> {
	array: Type[];
	list: LinkedList<Type>;
}

const tests: Test<number>[] = [
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

describe('array to linked list helper', () => {
	it.each(tests)(
		'should return linked list by the given array',
		({ array, list }) => {
			const response = arrayToLinkedList(array);
			expect(JSON.stringify(response)).toStrictEqual(JSON.stringify(list));
		}
	);
});
