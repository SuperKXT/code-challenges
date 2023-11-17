type tuple<
	T extends number,
	result extends 1[] = [],
> = result['length'] extends T ? result : tuple<T, [...result, 1]>;

type digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;

type numberToTuple<
	T extends number,
	str extends string = `${T}`,
> = str extends `${infer first extends digit}${infer rest}`
	? [first, ...numberToTuple<never, rest>]
	: str extends `${infer first extends digit}`
	  ? [first]
	  : [];

type compareDigit<T extends digit, U extends digit> = T extends U
	? 'equal'
	: tuple<U> extends [...tuple<T>, ...unknown[]]
	  ? 'less'
	  : 'greater';

type compareNumInner<tTuple extends digit[], uTuple extends digit[]> = [
	tTuple,
	uTuple,
] extends [
	[infer tFirst extends digit, ...infer tRest extends digit[]],
	[infer uFirst extends digit, ...infer uRest extends digit[]],
]
	? compareDigit<tFirst, uFirst> extends 'less'
		? 'less'
		: compareDigit<tFirst, uFirst> extends 'greater'
		  ? 'greater'
		  : compareNumInner<tRest, uRest>
	: 'equal';

type compareNum<
	T extends number,
	U extends number,
	tTuple extends digit[] = numberToTuple<T>,
	uTuple extends digit[] = numberToTuple<U>,
> = T extends U
	? 'equal'
	: tTuple[uTuple['length']] extends digit
	  ? 'greater'
	  : uTuple[tTuple['length']] extends digit
	    ? 'less'
	    : compareNumInner<tTuple, uTuple>;

type min<
	T extends readonly number[],
	val extends number = never,
> = T extends readonly [
	infer first extends number,
	...infer rest extends number[],
]
	? min<
			rest,
			[val] extends [never]
				? first
				: compareNum<first, val> extends 'less'
				  ? first
				  : val
	  >
	: [val] extends [never]
	  ? 0
	  : val;

type max<
	T extends readonly number[],
	val extends number = never,
> = T extends readonly [
	infer first extends number,
	...infer rest extends number[],
]
	? max<
			rest,
			[val] extends [never]
				? first
				: compareNum<first, val> extends 'greater'
				  ? first
				  : val
	  >
	: [val] extends [never]
	  ? 0
	  : val;

type subtract<T extends number, U extends number> = tuple<T> extends [
	...tuple<U>,
	...infer rest,
]
	? rest['length']
	: never;

type MaximumProfit<
	Arr extends readonly number[],
	minVal extends number = min<Arr>,
> = Arr extends readonly [
	infer first extends number,
	...infer rest extends number[],
]
	? first extends minVal
		? compareNum<minVal, max<rest>> extends 'less'
			? subtract<max<rest>, minVal>
			: 0
		: MaximumProfit<rest, minVal>
	: minVal;

export const maximumProfit = <const arr extends readonly number[]>(
	array: arr,
): MaximumProfit<arr> => {
	const min = Math.min(...array, 0);
	const max = Math.max(...array.slice(array.indexOf(min)), 0);
	return (max - min) as never;
};
