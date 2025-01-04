import {
	areArraysEqual,
	filterInPlace,
	inPlaceInsertToSortedArray,
	linkedListToArray,
} from "./array.helpers.js";
import { getRandomInteger } from "./random.helpers.js";

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
		second: ["1", "2", "3", "4"],
	},
	{
		areEqual: false,
		first: [1, 2, 3],
		second: [1],
	},
];

test.each(EQUALITY_TESTS)(
	"testing areArraysEqual helper",
	({ first, second, areEqual }) => {
		const response = areArraysEqual(first, second);
		expect(response).toStrictEqual(areEqual);
	},
);

test("testing linkedListToArray helper", () => {
	const test1 = {
		response: linkedListToArray({
			head: { next: { next: { next: null, value: 3 }, value: 2 }, value: 1 },
		}),
		expected: [1, 2, 3] as const,
	};
	expect(test1.response).toStrictEqual(test1.expected);
	assertType<(typeof test1)["expected"]>(test1.response);

	const test2 = {
		response: linkedListToArray({ head: null }),
		expected: [] as const,
	};
	expect(test2.response).toStrictEqual(test2.expected);
	assertType<(typeof test2)["expected"]>(test2.response);
});

test("testing inPlaceInsertToSortedArray helper", () => {
	const arr: number[] = [];
	const sourceArr = [];
	for (let i = 0; i < 100_000; i++) {
		sourceArr.push(getRandomInteger(0, 100_000));
	}
	const sorted = sourceArr.toSorted((a, b) => a - b);
	for (const value of sourceArr) {
		inPlaceInsertToSortedArray(arr, value);
	}
	expect(arr).toStrictEqual(sorted);
});

test("testing filterInPlace helper", () => {
	const sourceArr = [];
	for (let i = 0; i < 10_000; i++) {
		sourceArr.push(i + 1);
	}
	const prev = [...sourceArr];
	const removed = filterInPlace(sourceArr, (val) => val > 5_000);
	expect(removed).toBe(5_000);
	expect(sourceArr).toStrictEqual(prev.filter((r) => r > 5_000));
});
