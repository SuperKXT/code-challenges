/*
  476 - Sum
  -------
  by null (@uid11) #extreme #math #template-literal

  ### Question

  Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.

  For example,

  ```ts
  type T0 = Sum<2, 3> // '5'
  type T1 = Sum<'13', '21'> // '34'
  type T2 = Sum<'328', 7> // '335'
  type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
  ```

  > View on GitHub: https://tsch.js.org/476
*/

/* _____________ Your Code Here _____________ */

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Integer<T extends number> = `${T}` extends `${infer I extends
	number}.${string}`
	? I
	: T;

export type UnsignedInt<T extends number | string | bigint> =
	`${T}` extends `-${infer I extends number}`
		? Integer<I>
		: `${T}` extends `${infer I extends number}`
		? Integer<I>
		: never;

type ArrayReverse<T extends Digit[], Out extends Digit[] = []> = T extends [
	...infer Rest extends Digit[],
	infer L extends Digit,
]
	? ArrayReverse<Rest, [...Out, L]>
	: Out;

type Fill<T extends number, A extends number[] = []> = A['length'] extends T
	? A
	: Fill<T, [...A, 1]>;

type Shift<T extends number[]> = T extends [
	unknown,
	...infer R extends number[],
]
	? R
	: never;

type NumberToArray<
	T extends number,
	R extends string = `${T}`,
	A extends Digit[] = [],
> = R extends `${infer F extends Digit}${infer L}`
	? NumberToArray<T, L, [...A, F]>
	: A;

type ArrayToNumber<T extends Digit[], R extends string = ''> = T extends [
	infer F extends Digit,
	...infer Rest extends Digit[],
]
	? ArrayToNumber<Rest, `${R}${F}`>
	: `${R}` extends `${infer I extends number}`
	? I
	: never;

type GreaterThanDigits<
	T extends number[],
	U extends number[],
	TF extends number[] = Fill<T[0]>,
	UF extends number[] = Fill<U[0]>,
> = T['length'] extends 0
	? false
	: T[0] extends U[0]
	? GreaterThanDigits<Shift<T>, Shift<U>>
	: UF[TF['length']] extends undefined
	? true
	: false;

type GreaterThan<
	T extends number,
	U extends number,
	TA extends number[] = NumberToArray<T>,
	UA extends number[] = NumberToArray<U>,
> = T extends U
	? false
	: TA['length'] extends UA['length']
	? GreaterThanDigits<TA, UA>
	: UA[TA['length']] extends undefined
	? true
	: false;

type Max<T extends number[], M extends number = never> = T extends [
	infer F extends number,
	...infer R extends number[],
]
	? GreaterThan<F, M> extends true
		? Max<R, F>
		: Max<R, M>
	: M;

type PadLeft<T extends Digit[], Size extends number> = [
	0,
	...T,
][Size] extends Digit
	? T
	: PadLeft<[0, ...T], Size>;

type AddDigits<T extends Digit[], R extends unknown[] = []> = T extends [
	infer F extends Digit,
	...infer Rest extends Digit[],
]
	? AddDigits<Rest, [...R, ...Fill<F>]>
	: PadLeft<NumberToArray<R['length']>, 2>;

type _innerSum<
	A extends Digit[],
	B extends Digit[],
	R extends Digit[] = [],
	Carry extends Digit = 0,
> = A extends [infer FA extends Digit, ...infer RA extends Digit[]]
	? B extends [infer FB extends Digit, ...infer RB extends Digit[]]
		? AddDigits<[FA, FB, Carry]> extends [
				infer NewCarry extends Digit,
				infer Sum extends Digit,
		  ]
			? _innerSum<RA, RB, [...R, Sum], NewCarry>
			: never
		: never
	: Carry extends 0
	? R
	: [...R, Carry];

export type Sum<
	A extends string | number | bigint,
	B extends string | number | bigint,
	ArrayA extends Digit[] = NumberToArray<UnsignedInt<A>>,
	ArrayB extends Digit[] = NumberToArray<UnsignedInt<B>>,
	MaxNum extends number = Max<[ArrayA['length'], ArrayB['length']]>,
> = ArrayToNumber<
	ArrayReverse<
		_innerSum<
			ArrayReverse<PadLeft<ArrayA, MaxNum>>,
			ArrayReverse<PadLeft<ArrayB, MaxNum>>
		>
	>
>;

export type SumStringified<
	A extends string | number | bigint,
	B extends string | number | bigint,
> = `${Sum<A, B>}`;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from '@type-challenges/utils';

type _cases = [
	Expect<Equal<SumStringified<2, 3>, '5'>>,
	Expect<Equal<SumStringified<'13', '21'>, '34'>>,
	Expect<Equal<SumStringified<'328', 7>, '335'>>,
	Expect<Equal<SumStringified<1_000_000_000_000n, '123'>, '1000000000123'>>,
	Expect<Equal<SumStringified<9999, 1>, '10000'>>,
	Expect<Equal<SumStringified<4325234, '39532'>, '4364766'>>,
	Expect<Equal<SumStringified<728, 0>, '728'>>,
	Expect<Equal<SumStringified<'0', 213>, '213'>>,
	Expect<Equal<SumStringified<0, '0'>, '0'>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/476/answer
  > View solutions: https://tsch.js.org/476/solutions
  > More Challenges: https://tsch.js.org
*/
