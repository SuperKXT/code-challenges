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

type Count<
	from extends number,
	to extends number,
	idx extends 1[] = [],
	count extends number[] = [],
> = idx['length'] extends to
	? count['length']
	: Count<
			from,
			to,
			[...idx, 1],
			[...idx, 1][from] extends 1 ? [...count, 1] : count
		>;

type MaxStock<
	Prices extends number[],
	low extends number = never,
	high extends number = never,
	count extends 1[] = [],
> = Prices extends [infer curr extends number, ...infer rest extends number[]]
	? GreaterThan<low, curr> extends true
		? MaxStock<rest, curr, curr, [1]>
		: GreaterThan<curr, high> extends true
			? MaxStock<rest, low, curr, [...count, 1]>
			: MaxStock<rest, low, high, count>
	: Count<low, high>;

export const maxStock = <const Prices extends [number, ...number[]]>(
	prices: Prices,
): MaxStock<Prices> => {
	let low = Infinity;
	let high = -Infinity;
	for (const price of prices) {
		if (low > price) {
			low = price;
			high = price;
		} else if (high < price) {
			high = price;
		}
	}
	return (high - low) as never;
};
