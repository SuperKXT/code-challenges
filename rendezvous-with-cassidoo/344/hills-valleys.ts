type tuple<
	size extends number,
	res extends unknown[] = [],
> = res['length'] extends size ? res : tuple<size, [...res, 1]>;

type numberToTuple<
	num extends number,
	str extends string = `${num}`,
	res extends number[] = [],
> = str extends `${infer curr extends number}${infer rest}`
	? numberToTuple<never, rest, [...res, curr]>
	: res;

type compareDigits<
	digitA extends number,
	digitB extends number,
	tupA extends unknown[] = tuple<digitA>,
	tupB extends unknown[] = tuple<digitB>,
> = digitA extends digitB
	? 'equal'
	: tupA[tupB['length']] extends 1
		? 'greater'
		: 'lesser';

type compareNumbers<
	numA extends number,
	numB extends number,
	tupA extends number[] = numberToTuple<numA>,
	tupB extends number[] = numberToTuple<numB>,
> = numA extends numB
	? 'equal'
	: tupA['length'] extends tupB['length']
		? [tupA, tupB] extends [
				[infer firstA extends number, ...infer restA extends number[]],
				[infer firstB extends number, ...infer restB extends number[]],
			]
			? compareDigits<firstA, firstB> extends infer res
				? res extends 'equal'
					? compareNumbers<never, never, restA, restB>
					: res
				: never
			: never
		: tupA[tupB['length']] extends number
			? 'greater'
			: 'lesser';

type Hills<
	arr extends readonly number[],
	count extends unknown[] = [],
	uphill extends boolean = false,
> = arr extends readonly [
	infer curr extends number,
	infer next extends number,
	...infer rest extends number[],
]
	? compareNumbers<curr, next> extends infer res
		? Hills<
				[next, ...rest],
				[res, uphill] extends ['greater', true] ? [...count, 1] : count,
				res extends 'lesser' ? true : uphill
			>
		: never
	: count['length'];

export const hills = <const arr extends readonly number[]>(
	arr: arr,
): Hills<arr> => {
	let count = 0;
	let uphill = false;
	for (let i = 0; i < arr.length - 1; i++) {
		const curr = arr[i] as number;
		const next = arr[i + 1] as number;
		uphill ||= curr < next;
		if (curr > next && uphill) {
			count++;
			uphill = false;
		}
	}
	return count as never;
};

type Valleys<
	arr extends readonly number[],
	count extends unknown[] = [],
	downhill extends boolean = false,
> = arr extends readonly [
	infer curr extends number,
	infer next extends number,
	...infer rest extends number[],
]
	? compareNumbers<curr, next> extends infer res
		? Valleys<
				[next, ...rest],
				[res, downhill] extends ['lesser', true] ? [...count, 1] : count,
				res extends 'greater' ? true : downhill
			>
		: never
	: count['length'];

export const valleys = <const arr extends readonly number[]>(
	arr: arr,
): Valleys<arr> => {
	let count = 0;
	let downhill = false;
	for (let i = 0; i < arr.length - 1; i++) {
		const curr = arr[i] as number;
		const next = arr[i + 1] as number;
		downhill ||= curr > next;
		if (curr < next && downhill) {
			count++;
			downhill = false;
		}
	}
	return count as never;
};
