import { arrayToLinkedList } from './linked-list.helpers';

test('test arrayToLinkedList helper', () => {
	const test1 = {
		response: arrayToLinkedList([1, 2, 3]),
		expected: {
			head: { value: 1, next: { value: 2, next: { value: 3, next: null } } },
		} as const,
	};
	expect(JSON.stringify(test1.response)).toStrictEqual(
		JSON.stringify(test1.expected)
	);
	assertType<(typeof test1)['response']>(test1.expected);

	const test2 = {
		response: arrayToLinkedList([]),
		expected: { head: null } as const,
	};
	expect(JSON.stringify(test2.response)).toStrictEqual(
		JSON.stringify(test2.expected)
	);
	assertType<(typeof test2)['response']>(test2.expected);
});
