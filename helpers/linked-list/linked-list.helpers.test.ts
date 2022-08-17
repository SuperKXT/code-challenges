import { arrayToLinkedList } from './linked-list.helpers';
import { LinkedList } from './linked-list.types';

interface ToLinkedListTest<Type> {
	array: Type[],
	list: LinkedList<Type>,
}

const toLinkedListTests: ToLinkedListTest<number>[] = [
	{
		array: [1, 2, 3],
		list: { head: { value: 1, next: { value: 2, next: { value: 3, next: null } } } },
	},
	{
		array: [],
		list: { head: null },
	},
];

describe('array to linked list helper', () => {

	for (const test of toLinkedListTests) {
		it(`should return ${test.list} for [${test.array}]`, () => {
			const list = arrayToLinkedList(test.array);
			expect(JSON.stringify(list)).toStrictEqual(JSON.stringify(test.list));
		});
	}

});