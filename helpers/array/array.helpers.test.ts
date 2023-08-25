import { areArraysEqual, linkedListToArray } from './array.helpers';

type EqualityTest = {
	first: unknown[];
	second: unknown[];
	areEqual: boolean;
};

const EQUALITY_TESTS: EqualityTest[] = [
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

test.each(EQUALITY_TESTS)(
	'testing areArraysEqual helper',
	({ first, second, areEqual }) => {
		const response = areArraysEqual(first, second);
		expect(response).toStrictEqual(areEqual);
	},
);

test('testing linkedListToArray helper', () => {
	const test1 = {
		response: linkedListToArray({
			head: { next: { next: { next: null, value: 3 }, value: 2 }, value: 1 },
		}),
		expected: [1, 2, 3] as const,
	};
	expect(test1.response).toStrictEqual(test1.expected);
	assertType<(typeof test1)['expected']>(test1.response);

	const test2 = {
		response: linkedListToArray({ head: null }),
		expected: [] as const,
	};
	expect(test2.response).toStrictEqual(test2.expected);
	assertType<(typeof test2)['expected']>(test2.response);
});
