type TDigitString = `0123456789`;

type TCompareDigit<
	A extends number | string,
	B extends number | string,
> = A extends B
	? 0
	: TDigitString extends `${string}${A}${string}${B}${string}`
		? -1
		: 1;

type TDigitTuple<
	num extends number | string,
	res extends unknown[] = [],
> = `${num}` extends `${infer digit}${infer rest}`
	? TDigitTuple<rest, [...res, digit]>
	: res;

type TCompareNumber<
	A extends number,
	B extends number,
	aTup extends string[] = TDigitTuple<A>,
	bTup extends string[] = TDigitTuple<B>,
> = A extends B
	? 0
	: aTup["length"] extends bTup["length"]
		? aTup extends [
				infer aFirst extends string,
				...infer aRest extends string[],
			]
			? bTup extends [
					infer bFirst extends string,
					...infer bRest extends string[],
				]
				? TCompareDigit<aFirst, bFirst> extends infer res
					? res extends 0
						? TCompareNumber<A, B, aRest, bRest>
						: res
					: never
				: never
			: never
		: aTup[bTup["length"]] extends string
			? 1
			: -1;
type TSmallest<
	nums extends number[],
	smallest extends number = never,
> = nums extends [infer first extends number, ...infer rest extends number[]]
	? TSmallest<
			rest,
			[smallest] extends [never]
				? first
				: TCompareNumber<first, smallest> extends -1
					? first
					: smallest
		>
	: smallest;

type TRemoveNumber<nums extends number[], num extends number> = nums extends [
	infer first extends number,
	...infer rest extends number[],
]
	? first extends num
		? rest
		: [first, ...TRemoveNumber<rest, num>]
	: [];

type TSort<
	nums extends number[],
	sorted extends number[] = [],
> = nums extends []
	? sorted
	: TSmallest<nums> extends infer smallest extends number
		? TSort<TRemoveNumber<nums, smallest>, [...sorted, smallest]>
		: never;

type TTuple<
	size extends number,
	res extends unknown[] = [],
> = size extends res["length"] ? res : TTuple<size, [...res, 1]>;

type TWrapGifts<
	nums extends number[],
	width extends number,
	sorted extends number[] = TSort<nums>,
	count extends unknown[] = [],
	sum extends unknown[] = [],
> = sorted extends [infer first extends number, ...infer rest extends number[]]
	? TCompareNumber<
			[...sum, ...TTuple<first>]["length"] & number,
			width
		> extends 1
		? count["length"]
		: TWrapGifts<nums, width, rest, [...count, 1], [...sum, ...TTuple<first>]>
	: count["length"];

export const wrapGifts = <const TGifts extends number[], TWidth extends number>(
	gifts: TGifts,
	width: TWidth,
): TWrapGifts<TGifts, TWidth> => {
	const sorted = gifts.toSorted((a, b) => a - b);
	let count = 0;
	let sum = 0;
	for (const curr of sorted) {
		sum += curr;
		if (sum > width) break;
		count++;
	}
	return count as never;
};
