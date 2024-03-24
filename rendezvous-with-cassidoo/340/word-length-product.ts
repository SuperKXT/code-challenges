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

type tuple<
	size extends number,
	res extends unknown[] = [],
> = res['length'] extends size ? res : tuple<size, [...res, 1]>;

type stringTuple<str extends string> = str extends `${infer first}${infer rest}`
	? [first, ...stringTuple<rest>]
	: [];

type multiply<
	numA extends number,
	numB extends number,
	idx extends unknown[] = [],
	res extends unknown[] = [],
> = idx['length'] extends numB
	? res['length']
	: multiply<numA, numB, [...idx, 1], [...res, ...tuple<numA>]>;

type nextMax<
	strA extends string,
	strB extends string,
	currMax extends number,
	charsA extends string = stringTuple<strA>[number],
> = true extends (charsA extends stringTuple<strB>[number] ? true : false)
	? currMax
	: multiply<
				stringTuple<strA>['length'],
				stringTuple<strB>['length']
		  > extends infer product extends number
		? greaterThan<product, currMax> extends true
			? product
			: currMax
		: currMax;

type maxProductForWord<
	word extends string,
	arr extends string[],
	currMax extends number = 0,
> = arr extends [infer first extends string, ...infer rest extends string[]]
	? maxProductForWord<word, rest, nextMax<word, first, currMax>>
	: currMax;

type WordLengthProduct<
	arr extends string[],
	maxProduct extends number = 0,
	idx extends unknown[] = [],
> = idx['length'] extends arr['length']
	? maxProduct
	: WordLengthProduct<
			arr,
			maxProductForWord<arr[idx['length']], arr, maxProduct>,
			[...idx, 1]
		>;

export const wordLengthProduct = <const Arr extends string[]>(
	arr: Arr,
): WordLengthProduct<Arr> => {
	let maxProduct: number = 0;
	for (let i = 0; i < arr.length; i++) {
		for (let j = i; j < arr.length; j++) {
			const iVal = arr[i] as string;
			const jVal = arr[j] as string;
			const combined = iVal + jVal;
			const currProduct = iVal.length * jVal.length;
			const iSize = new Set(iVal).size;
			const jSize = new Set(jVal).size;
			const ijSize = new Set(combined).size;
			if (iSize + jSize === ijSize && currProduct > maxProduct)
				maxProduct = currProduct;
		}
	}
	return maxProduct as never;
};
