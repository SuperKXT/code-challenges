import type { Equal, Expect } from '@type-challenges/utils';

export const binaryPal = <T extends number>(input: T) => {
	const binary = Math.abs(input).toString(2);
	return (binary === binary.split('').reverse().join('')) as BinaryPal<T>;
};

type BinaryPal<T extends number> = IsPalindrome<NumberToBinary<T>>;

type NumberToBinary<
	T extends number,
	Arr extends any[] = NumberToArray<Unsigned<T>>,
	Binary extends any[] = [],
> = Halve<Arr> extends [infer Halved extends any[], infer Remainder]
	? Halved extends []
		? [Remainder, ...Binary]
		: NumberToBinary<T, Halved, [Remainder, ...Binary]>
	: never;

type IsPalindrome<T extends any[]> = T extends [infer F, ...infer R, infer L]
	? [F] extends [L]
		? IsPalindrome<R>
		: false
	: true;

type Halve<T extends any[], L extends any[] = []> = T extends [
	infer F,
	any,
	...infer R,
]
	? Halve<R, [...L, F]>
	: [L, T extends [any] ? 1 : 0];

type Unsigned<T extends number> = `${T}` extends `-${infer U extends number}`
	? U
	: T;

type NumberToArray<T extends number, A extends 1[] = []> = A['length'] extends T
	? A
	: NumberToArray<T, [...A, 1]>;

type _cases = [
	Expect<Equal<BinaryPal<5>, true>>,
	Expect<Equal<BinaryPal<10>, false>>,
	Expect<Equal<BinaryPal<23>, false>>,
	Expect<Equal<BinaryPal<152>, false>>,
	Expect<Equal<BinaryPal<-250>, false>>,
	Expect<Equal<BinaryPal<513>, true>>,
	Expect<Equal<BinaryPal<-513>, true>>,
];
