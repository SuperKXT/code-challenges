type tuple<T extends number, tup extends 1[] = []> = tup['length'] extends T
	? tup
	: tuple<T, [...tup, 1]>;

type smallest<T extends number[], curr extends 1[] = []> = T extends [
	infer first extends number,
	...infer rest extends number[],
]
	? smallest<
			rest,
			curr extends []
				? tuple<first>
				: curr extends [...tuple<first>, ...number[]]
					? tuple<first>
					: curr
		>
	: curr['length'];

type without<
	T extends number[],
	N extends number,
	res extends number[] = [],
> = T extends [infer first extends number, ...infer rest extends number[]]
	? first extends N
		? [...res, ...rest]
		: without<rest, N, [...res, first]>
	: res;

type sort<T extends number[], sorted extends number[] = []> = T extends [
	number,
	...number[],
]
	? sort<without<T, smallest<T>>, [...sorted, smallest<T>]>
	: sorted;

type isEven<
	T extends number,
	tup extends 1[] = tuple<T>,
	idx extends 1[] = [],
> = tup extends [...idx, ...idx]
	? true
	: tup extends [...idx, ...idx, 1]
		? false
		: isEven<never, tup, [...idx, 1]>;

type unReadonly<T extends readonly unknown[]> = T extends readonly [
	...infer arr,
]
	? arr
	: T;

type deepReadonly<T extends object> = Readonly<{
	[k in keyof T]: T[k] extends object ? deepReadonly<T[k]> : T[k];
}>;

type SeparateAndSort<
	T extends readonly number[],
	sorted extends number[] = sort<unReadonly<T>>,
	res extends [number[], number[]] = [[], []],
> = sorted extends [infer first extends number, ...infer rest extends number[]]
	? SeparateAndSort<
			never,
			rest,
			first extends 0
				? res
				: isEven<first> extends true
					? [[...res[0], first], res[1]]
					: [res[0], [...res[1], first]]
		>
	: deepReadonly<res>;

export const separateAndSort = <const T extends readonly number[]>(
	input: T,
): SeparateAndSort<T> => {
	const result: [number[], number[]] = [[], []];
	for (const num of input.toSorted((a, b) => a - b)) {
		if (!num) continue;
		const mod = (num % 2) as 0 | 1;
		result[mod].push(num);
	}
	return result as never;
};
