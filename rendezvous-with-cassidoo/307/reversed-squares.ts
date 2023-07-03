type _tuple<N extends number, T, R extends readonly T[]> = R['length'] extends N
	? R
	: _tuple<N, T, [T, ...R]>;

type tuple<N extends number, T = 1> = N extends N
	? number extends N
		? T[]
		: _tuple<N, T, []>
	: never;

type multiply<
	T extends number,
	U extends number,
	idx extends 1[] = [],
	result extends 1[] = []
> = idx['length'] extends U
	? result['length']
	: multiply<T, U, [...idx, 1], [...result, ...tuple<T>]>;

type sqrt<T extends number, idx extends 1[] = []> = idx['length'] extends T
	? never
	: multiply<idx['length'], idx['length']> extends T
	? idx['length']
	: sqrt<T, [...idx, 1]>;

type reverse<T extends string> = T extends `${infer F}${infer R}`
	? `${reverse<R>}${F}`
	: T;

type reverseNumber<T extends number> =
	reverse<`${T}`> extends `${infer N extends number}` ? N : never;

type ReversedSquare<T extends number> = [sqrt<T>] extends [never]
	? false
	: [sqrt<reverseNumber<T>>] extends [never]
	? false
	: true;

export const reversedSquare = <T extends number>(num: T): ReversedSquare<T> => {
	const reverse = Number(String(num).split('').reverse().join(''));
	return (Number.isInteger(Math.sqrt(num)) &&
		Number.isInteger(Math.sqrt(reverse))) as never;
};
