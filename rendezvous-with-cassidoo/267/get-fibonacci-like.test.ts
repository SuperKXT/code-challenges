import {
	ERRORS,
	getFibonacciLike,
	isFibonacciLike,
} from './get-fibonacci-like.js';

type GetTest = {
	input: [number, number, number];
	output: number[];
};

const GET_TESTS: GetTest[] = [
	{ input: [10, 20, 5], output: [10, 20, 30, 50, 80] },
	{ input: [3, 7, 7], output: [3, 7, 10, 17, 27, 44, 71] },
	{ input: [5, 10, 3], output: [5, 10, 15] },
	{ input: [4, NaN, 4], output: [4, NaN, NaN, NaN] },
	{ input: [4, -1, 5], output: [4, -1, 3, 2, 5] },
];

type BadGetTest = {
	input: [number, number, number];
	error: string;
};

const BAD_GET_TESTS: BadGetTest[] = [
	{ error: ERRORS.length, input: [5, 10, 2] },
	{ error: ERRORS.length, input: [5, 10, -5] },
	{ error: ERRORS.length, input: [5, 10, 1] },
	// @ts-expect-error intentional error check
	{ error: ERRORS.undefined, input: [5, undefined, 5] },
];

type CheckTest = {
	input: number[];
	output: boolean;
};

const CHECK_TESTS: CheckTest[] = [
	{ input: [10, 20, 5], output: false },
	{ input: [3, 7, 10, 17, 27], output: true },
	{ input: [], output: false },
	{ input: [1], output: false },
	{ input: [2], output: false },
	{ input: [4, -1, 3, 2, 5], output: true },
	{ input: [NaN, 1, NaN], output: true },
	// @ts-expect-error intentional error check
	{ input: [5, undefined, 15], output: false },
];

test.each(GET_TESTS)(
	'testing getFibonacciLike for good input',
	({ input, output }) => {
		const response = getFibonacciLike(...input);
		expect(response).toStrictEqual(output);
	},
);
test.each(BAD_GET_TESTS)(
	'testing getFibonacciLike for bad input',
	({ input, error }) => {
		expect(() => getFibonacciLike(...input)).toThrow(error);
	},
);

test.each(CHECK_TESTS)('testing isFibonacciLike', ({ input, output }) => {
	const response = isFibonacciLike(input);
	expect(response).toStrictEqual(output);
});
