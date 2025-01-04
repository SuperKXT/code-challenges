/*
  7561 - Subtract
  -------
  by Lo (@LoTwT) #extreme #tuple

  ### Question

  Implement the type Subtraction that is ` - ` in Javascript by using BuildTuple.

  If the minuend is less than the subtrahend, it should be `never`.

  It's a simple version.

  For example

  ```ts
  Subtract<2, 1> // expect to be 1
  Subtract<1, 2> // expect to be never
  ```

  > View on GitHub: https://tsch.js.org/7561
*/

/* _____________ Your Code Here _____________ */

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type SubNum = Digit | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;

type PrevMap = {
	0: 0;
	1: 0;
	2: 1;
	3: 2;
	4: 3;
	5: 4;
	6: 5;
	7: 6;
	8: 7;
	9: 8;
	10: 9;
	11: 10;
	12: 11;
	13: 12;
	14: 13;
	15: 14;
	16: 15;
	17: 16;
	18: 17;
	19: 18;
};

type AddTen<T extends Digit> = `1${T}` extends `${infer N extends SubNum}`
	? N
	: never;

type Fill<T extends number, R extends 1[] = []> = T extends R["length"]
	? R
	: Fill<T, [...R, 1]>;

type PadLeft<S extends number, T extends Digit[]> = [
	...T,
	1,
][S] extends undefined
	? PadLeft<S, [0, ...T]>
	: T;

type NumberToArr<
	T extends number,
	S extends string = `${T}`,
> = S extends `${infer F extends Digit}${infer R}`
	? [F, ...NumberToArr<never, R>]
	: [];

type ArrToString<T extends number[]> = T extends [
	infer F extends number,
	...infer R extends number[],
]
	? `${F}${ArrToString<R>}`
	: "";

type ArrToNumber<T extends Digit[]> = T extends [0, ...infer R extends Digit[]]
	? ArrToNumber<R>
	: `${ArrToString<T>}` extends `${infer N extends number}`
		? N
		: never;

type LesserThanDigit<T extends SubNum, U extends SubNum> = T extends U
	? false
	: Fill<T>[Fill<U>["length"]] extends undefined
		? true
		: false;

type LesserThan<
	A extends number,
	B extends number,
	ArrA extends Digit[] = NumberToArr<A>,
	ArrB extends Digit[] = NumberToArr<B>,
> = A extends B
	? false
	: [...ArrA, 1][ArrB["length"]] extends undefined
		? ArrB
		: [...ArrB, 1][ArrA["length"]] extends undefined
			? false
			: [ArrA, ArrB] extends [
						[...infer RestA extends Digit[], infer LastA extends Digit],
						[...infer RestB extends Digit[], infer LastB extends Digit],
				  ]
				? LesserThanDigit<LastA, LastB> extends true
					? true
					: LastA extends LastB
						? LesserThan<A, B, RestA, RestB>
						: false
				: false;

type SubtractDigit<
	T extends SubNum,
	U extends SubNum,
	Lesser extends SubNum = LesserThanDigit<T, U> extends true ? T : U,
	S extends 1[] = Fill<Lesser>,
	R extends 1[] = [],
> = T extends U
	? 0
	: [...R, ...S]["length"] extends Exclude<T | U, Lesser>
		? R["length"]
		: SubtractDigit<T, U, Lesser, S, [...R, 1]>;

type GetCarry<T extends Digit[], R extends SubNum[] = []> = T extends [
	...infer F extends Digit[],
	infer SL extends Digit,
	infer L extends Digit,
]
	? SL extends 0
		? GetCarry<
				[...F, SL],
				[R extends [] ? AddTen<L> : PrevMap[AddTen<L>], ...R]
			>
		: [...F, PrevMap[SL], R extends [] ? AddTen<L> : PrevMap[AddTen<L>], ...R]
	: R extends []
		? T
		: R;

type Subtract<
	A extends number,
	B extends number,
	ArrA extends Digit[] = NumberToArr<A>,
	ArrB extends Digit[] = PadLeft<A, NumberToArr<B>>,
	Result extends Digit[] = [],
> = A extends B
	? 0
	: LesserThan<A, B> extends true
		? never
		: [ArrA, ArrB] extends [
					[...infer RestA extends Digit[], infer LastA extends Digit],
					[...infer RestB extends Digit[], infer LastB extends Digit],
			  ]
			? LesserThan<LastA, LastB> extends true
				? GetCarry<ArrA> extends [
						...infer CarryRestA extends Digit[],
						infer CarryRestB extends SubNum,
					]
					? Subtract<
							A,
							B,
							CarryRestA,
							RestB,
							[SubtractDigit<CarryRestB, LastB>, ...Result]
						>
					: GetCarry<ArrA>
				: Subtract<A, B, RestA, RestB, [SubtractDigit<LastA, LastB>, ...Result]>
			: ArrToNumber<Result>;

// BETTER!
type Tuple<T, Res extends 1[] = []> = 0 extends 1
	? never
	: Res["length"] extends T
		? Res
		: Tuple<T, [...Res, 1]>;

type _Subtract<M extends number, S extends number> =
	Tuple<M> extends [...Tuple<S>, ...infer Rest] ? Rest["length"] : never;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<Subtract<1, 1>, 0>>,
	Expect<Equal<Subtract<2, 1>, 1>>,
	Expect<Equal<Subtract<1, 2>, never>>,
	Expect<Equal<Subtract<1000, 999>, 1>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/7561/answer
  > View solutions: https://tsch.js.org/7561/solutions
  > More Challenges: https://tsch.js.org
*/
