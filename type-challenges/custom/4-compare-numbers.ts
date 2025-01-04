import type { Equal, Expect } from "@type-challenges/utils";

type tuple<
	size extends number,
	res extends unknown[] = [],
> = res["length"] extends size ? res : tuple<size, [...res, 1]>;

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
	? "equal"
	: tupA[tupB["length"]] extends 1
		? "greater"
		: "lesser";

type compareNumbers<
	numA extends number,
	numB extends number,
	tupA extends number[] = numberToTuple<numA>,
	tupB extends number[] = numberToTuple<numB>,
> = numA extends numB
	? "equal"
	: tupA["length"] extends tupB["length"]
		? [tupA, tupB] extends [
				[infer firstA extends number, ...infer restA extends number[]],
				[infer firstB extends number, ...infer restB extends number[]],
			]
			? compareDigits<firstA, firstB> extends infer res
				? res extends "equal"
					? compareNumbers<numA, numB, restA, restB>
					: res
				: never
			: never
		: tupA[tupB["length"]] extends number
			? "greater"
			: "lesser";

/* _____________ Test Cases _____________ */
type _cases = [
	Expect<Equal<compareNumbers<2050, 205>, "greater">>,
	Expect<Equal<compareNumbers<2050, 2050>, "equal">>,
	Expect<Equal<compareNumbers<2050, 20500>, "lesser">>,
	Expect<Equal<compareNumbers<0, 1>, "lesser">>,
	Expect<Equal<compareNumbers<250_000_001, 250_000_000>, "greater">>,
];
