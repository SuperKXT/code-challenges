import { arrayToLinkedList } from './linked-list.helpers';

import type { LinkedList } from './linked-list.types';

interface Test<Type> {
	array: Type[];
	list: LinkedList<Type>;
}

const TESTS: Test<number>[] = [
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

describe('array to linked list helper', () => {
	it.each(TESTS)(
		'should return linked list by the given array',
		({ array, list }) => {
			const response = arrayToLinkedList(array);
			expect(JSON.stringify(response)).toStrictEqual(JSON.stringify(list));
		}
	);
});
