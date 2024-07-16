type Fill<T extends number, A extends number[] = []> = A['length'] extends T
	? A
	: Fill<T, [...A, 1]>;

type Shift<T extends number[]> = T extends [
	unknown,
	...infer R extends number[],
]
	? R
	: never;

type NumberToArray<
	T extends number,
	R extends string = `${T}`,
	A extends number[] = [],
> = R extends `${infer F extends number}${infer L}`
	? NumberToArray<T, L, [...A, F]>
	: A;

type GreaterThanDigits<
	T extends number[],
	U extends number[],
	TF extends number[] = Fill<T[0]>,
	UF extends number[] = Fill<U[0]>,
> = T['length'] extends 0
	? false
	: T[0] extends U[0]
		? GreaterThanDigits<Shift<T>, Shift<U>>
		: UF[TF['length']] extends undefined
			? true
			: false;

type GreaterThan<
	T extends number,
	U extends number,
	TA extends number[] = NumberToArray<T>,
	UA extends number[] = NumberToArray<U>,
> = T extends U
	? false
	: TA['length'] extends UA['length']
		? GreaterThanDigits<TA, UA>
		: UA[TA['length']] extends undefined
			? true
			: false;

type IncreasingSubsequence<
	Arr extends number[],
	longest extends unknown[] = [],
	curr extends unknown[] = [],
> = Arr extends [
	infer last extends number,
	infer num extends number,
	...infer rest extends number[],
]
	? GreaterThan<num, last> extends true
		? IncreasingSubsequence<[num, ...rest], longest, [...curr, 1]>
		: IncreasingSubsequence<
				[num, ...rest],
				longest[curr['length']] extends number ? longest : curr,
				[1]
			>
	: longest[curr['length']] extends number
		? longest['length']
		: curr['length'];

export const increasingSubsequence = <const Arr extends [number, ...number[]]>(
	array: Arr,
): IncreasingSubsequence<Arr> => {
	let longest = 0;
	let curr = 0;
	let last = Infinity;
	for (const num of array) {
		if (num > last) {
			curr++;
		} else {
			longest = Math.max(longest, curr);
			curr = 1;
		}
		last = num;
	}
	return Math.max(longest, curr) as never;
};
