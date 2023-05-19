import { arrayToLinkedList, insertToLinkedList } from './linked-list.helpers';

test('testing arrayToLinkedList helper', () => {
	const test1 = {
		response: arrayToLinkedList([1, 2, 3]),
		expected: {
			head: { value: 1, next: { value: 2, next: { value: 3, next: null } } },
		} as const,
	};
	expect(test1.response).toStrictEqual(test1.expected);
	assertType<(typeof test1)['response']>(test1.expected);

	const test2 = {
		response: arrayToLinkedList([]),
		expected: { head: null } as const,
	};
	expect(test2.response).toStrictEqual(test2.expected);
	assertType<(typeof test2)['response']>(test2.expected);
});

test('testing insertToLinkedList helper', () => {
	const test1 = {
		list: {
			head: { value: 1, next: { value: 2, next: { value: 3, next: null } } },
		} as const,
		expected: {
			head: {
				value: 1,
				next: { value: 2, next: { value: 3, next: { value: 4, next: null } } },
			},
		} as const,
	};
	const response1 = insertToLinkedList(test1.list, 4);
	expect(response1).toStrictEqual(test1.expected);
	assertType<typeof response1>(test1.expected);

	const test2 = {
		list: { head: null } as const,
		expected: { head: { value: 1, next: null } } as const,
	};
	const response2 = insertToLinkedList(test2.list, 1);
	expect(response2).toStrictEqual(test2.expected);
	assertType<typeof response2>(test2.expected);
});
