type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type tuple<
	size extends number,
	tup extends 1[] = [],
> = tup['length'] extends size ? tup : tuple<size, [...tup, 1]>;

type numToTuple<num extends number> = `${num}` extends `${infer first extends
	digit}${infer rest extends number}`
	? [first, ...numToTuple<rest>]
	: num extends digit
	  ? [num]
	  : [];

type tupleToString<T extends digit[]> = T extends [
	infer first extends digit,
	...infer rest extends digit[],
]
	? `${first}${tupleToString<rest>}`
	: '';

type tupleToNum<T extends digit[]> =
	`${tupleToString<T>}` extends `${infer num extends number}` ? num : never;
type shift<T extends number[]> = T extends [
	unknown,
	...infer R extends number[],
]
	? R
	: never;

type lessThanDigits<
	T extends number[],
	U extends number[],
	TF extends number[] = tuple<T[0]>,
	UF extends number[] = tuple<U[0]>,
> = T['length'] extends 0
	? false
	: T[0] extends U[0]
	  ? lessThanDigits<shift<T>, shift<U>>
	  : TF[UF['length']] extends undefined
	    ? true
	    : false;

type lessThan<
	T extends number,
	U extends number,
	TA extends number[] = numToTuple<T>,
	UA extends number[] = numToTuple<U>,
> = T extends U
	? false
	: TA['length'] extends UA['length']
	  ? lessThanDigits<TA, UA>
	  : TA[UA['length']] extends undefined
	    ? true
	    : false;

export type LexoNext<
	num extends number,
	tup extends digit[] = numToTuple<num>,
	res extends digit[] = [],
> = tup extends [
	...infer rest extends digit[],
	infer last extends digit,
	infer curr extends digit,
]
	? lessThan<last, curr> extends true
		? tupleToNum<[...rest, curr, last, ...res]>
		: LexoNext<never, rest, [last, curr, ...res]>
	: tupleToNum<[...tup, ...res]>;

export const lexoNext = <Num extends number>(num: Num): LexoNext<Num> => {
	const digitArray = num.toString().split('');
	for (let i = digitArray.length - 1; i > 0; i--) {
		const curr = parseInt(digitArray[i] as string);
		const last = parseInt(digitArray[i - 1] as string);
		if (last < curr) {
			digitArray[i] = last.toString();
			digitArray[i - 1] = curr.toString();
			break;
		}
	}
	return Number(digitArray.join('')) as never;
};
