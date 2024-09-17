type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Integer<T extends number> = `${T}` extends `${infer I extends
	number}.${string}`
	? I
	: T;

export type UnsignedInt<T extends number | string | bigint> =
	`${T}` extends `-${infer I extends number}`
		? Integer<I>
		: `${T}` extends `${infer I extends number}`
			? Integer<I>
			: never;

type ArrayReverse<T extends Digit[], Out extends Digit[] = []> = T extends [
	...infer Rest extends Digit[],
	infer L extends Digit,
]
	? ArrayReverse<Rest, [...Out, L]>
	: Out;

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
	A extends Digit[] = [],
> = R extends `${infer F extends Digit}${infer L}`
	? NumberToArray<T, L, [...A, F]>
	: A;

type ArrayToNumber<T extends Digit[], R extends string = ''> = T extends [
	infer F extends Digit,
	...infer Rest extends Digit[],
]
	? ArrayToNumber<Rest, `${R}${F}`>
	: `${R}` extends `${infer I extends number}`
		? I
		: never;

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

type Max<T extends number[], M extends number = never> = T extends [
	infer F extends number,
	...infer R extends number[],
]
	? GreaterThan<F, M> extends true
		? Max<R, F>
		: Max<R, M>
	: M;

type PadLeft<T extends Digit[], Size extends number> = [
	0,
	...T,
][Size] extends Digit
	? T
	: PadLeft<[0, ...T], Size>;

type AddDigits<T extends Digit[], R extends unknown[] = []> = T extends [
	infer F extends Digit,
	...infer Rest extends Digit[],
]
	? AddDigits<Rest, [...R, ...Fill<F>]>
	: PadLeft<NumberToArray<R['length']>, 2>;

type _innerSum<
	A extends Digit[],
	B extends Digit[],
	R extends Digit[] = [],
	Carry extends Digit = 0,
> = A extends [infer FA extends Digit, ...infer RA extends Digit[]]
	? B extends [infer FB extends Digit, ...infer RB extends Digit[]]
		? AddDigits<[FA, FB, Carry]> extends [
				infer NewCarry extends Digit,
				infer Sum extends Digit,
			]
			? _innerSum<RA, RB, [...R, Sum], NewCarry>
			: never
		: never
	: Carry extends 0
		? R
		: [...R, Carry];

export type Sum<
	A extends string | number | bigint,
	B extends string | number | bigint,
	ArrayA extends Digit[] = NumberToArray<UnsignedInt<A>>,
	ArrayB extends Digit[] = NumberToArray<UnsignedInt<B>>,
	MaxNum extends number = Max<[ArrayA['length'], ArrayB['length']]>,
> = ArrayToNumber<
	ArrayReverse<
		_innerSum<
			ArrayReverse<PadLeft<ArrayA, MaxNum>>,
			ArrayReverse<PadLeft<ArrayB, MaxNum>>
		>
	>
>;

const options = [6, 3, 2] as const;

type Option = (typeof options)[number];

type Combination = { sum: number; combination: number[] };

type GreatestInTuple<
	T extends number[],
	Val extends number = T[0],
> = T extends [infer first extends number, ...infer rest extends number[]]
	? GreatestInTuple<rest, GreaterThan<first, Val> extends true ? first : Val>
	: Val;

type RemoveFromTuple<T extends number[], Remove extends number> = T extends [
	infer first extends number,
	...infer rest extends number[],
]
	? first extends Remove
		? rest
		: [first, ...RemoveFromTuple<rest, Remove>]
	: [];

type SortTuple<T extends number[]> =
	GreatestInTuple<T> extends infer curr extends number
		? [...SortTuple<RemoveFromTuple<T, curr>>, curr]
		: [];

type GetCombinations<
	Target extends number,
	Current extends Combination = { sum: 0; combination: [] },
	Opts extends Option = Option,
> = Opts extends Opts
	? Sum<Current['sum'], Opts> extends infer sum extends number
		? sum extends Target
			? SortTuple<[...Current['combination'], Opts]>
			: GreaterThan<sum, Target> extends true
				? never
				: GetCombinations<
						Target,
						{ sum: sum; combination: [...Current['combination'], Opts] }
					>
		: never
	: never;

type CountUnionMembers<T, Count extends 1[] = [], U = T> = [U] extends [never]
	? Count['length']
	: U extends U
		? CountUnionMembers<Exclude<T, U>, [...Count, 1]>
		: Count['length'];

type WaysToScore<Target extends number> = CountUnionMembers<
	GetCombinations<Target>
>;

const getCombinations = (
	targetSum: number,
	current: Combination = { sum: 0, combination: [] },
): Combination[] => {
	const combinations: Combination[] = [];
	for (const option of options) {
		const sum = current.sum + option;
		const combination = [...current.combination, option];
		if (sum === targetSum) combinations.push({ sum, combination });
		else if (sum < targetSum)
			combinations.push(...getCombinations(targetSum, { sum, combination }));
	}
	return combinations;
};

export const waysToScore = <Target extends number>(
	target: Target,
): WaysToScore<Target> => {
	const candidates = getCombinations(target).map((r) =>
		r.combination.sort((a, b) => a - b),
	);
	const existSet = new Set<string>();
	let count = 0;
	for (const candidate of candidates) {
		const key = candidate.join(',');
		if (existSet.has(key)) continue;
		existSet.add(key);
		count++;
	}
	return count as never;
};
