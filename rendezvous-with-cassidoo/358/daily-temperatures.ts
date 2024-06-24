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

type FindGreaterIdx<
	curr extends number,
	arr extends number[],
	idx extends number[] = [1],
> = arr extends [infer first extends number, ...infer rest extends number[]]
	? GreaterThan<first, curr> extends true
		? idx['length']
		: FindGreaterIdx<curr, rest, [...idx, 1]>
	: 0;

type DailyTemps<input extends number[]> = input extends [
	infer first extends number,
	...infer rest extends number[],
]
	? [FindGreaterIdx<first, rest>, ...DailyTemps<rest>]
	: [];

export const dailyTemperatures = <const Input extends [number, ...number[]]>(
	input: Input,
): DailyTemps<Input> => {
	return input.map((num, idx) =>
		Math.max(
			input.slice(idx).findIndex((n) => n > num),
			0,
		),
	) as never;
};
