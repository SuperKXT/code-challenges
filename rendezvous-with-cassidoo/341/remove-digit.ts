type digitOpts = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type tuple<
	size extends number,
	res extends unknown[] = [],
> = res['length'] extends size ? res : tuple<size, [...res, 1]>;

type shift<arr extends number[]> = arr extends [
	unknown,
	...infer rest extends number[],
]
	? rest
	: never;

type numberToTuple<
	num extends number,
	numString extends string = `${num}`,
	res extends number[] = [],
> = numString extends `${infer first extends number}${infer last}`
	? numberToTuple<num, last, [...res, first]>
	: res;

type greaterThanDigits<
	numA extends number[],
	numB extends number[],
	tupleA extends number[] = tuple<numA[0]>,
	tupleB extends number[] = tuple<numB[0]>,
> = numA['length'] extends 0
	? false
	: numA[0] extends numB[0]
		? greaterThanDigits<shift<numA>, shift<numB>>
		: tupleB[tupleA['length']] extends undefined
			? true
			: false;

type greaterThan<
	T extends number,
	U extends number,
	TA extends number[] = numberToTuple<T>,
	UA extends number[] = numberToTuple<U>,
> = T extends U
	? false
	: TA['length'] extends UA['length']
		? greaterThanDigits<TA, UA>
		: UA[TA['length']] extends undefined
			? true
			: false;

type RemoveDigit<
	num extends number,
	digit extends digitOpts,
	numStr extends string = `${num}`,
	prevStr extends string = '',
	max extends number = 0,
> = numStr extends `${infer first extends number}${infer rest}`
	? [first, `${prevStr}${rest}`] extends [
			digit,
			`${infer currNum extends number}`,
		]
		? RemoveDigit<
				num,
				digit,
				rest,
				`${prevStr}${first}`,
				greaterThan<currNum, max> extends true ? currNum : max
			>
		: RemoveDigit<num, digit, rest, `${prevStr}${first}`, max>
	: max;

export const removeDigit = <num extends number, digit extends digitOpts>(
	num: num,
	digit: digit,
): RemoveDigit<num, digit> => {
	let maxProduct = 0;
	const numStr = num.toString();
	for (let idx = 0; idx < numStr.length; idx++) {
		const curr = numStr[idx] as string;
		if (curr === digit.toString()) {
			const currNum = Number(`${numStr.slice(0, idx)}${numStr.slice(idx + 1)}`);
			maxProduct = Math.max(maxProduct, currNum);
		}
	}
	return maxProduct as never;
};
