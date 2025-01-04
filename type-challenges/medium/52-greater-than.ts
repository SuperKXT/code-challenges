/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */

type Fill<T extends number, A extends number[] = []> = A["length"] extends T
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
	A extends number[] = [],
> = R extends `${infer F extends number}${infer L}`
	? NumberToArray<T, L, [...A, F]>
	: A;

type GreaterThanDigits<
	T extends number[],
	U extends number[],
	TF extends number[] = Fill<T[0]>,
	UF extends number[] = Fill<U[0]>,
> = T["length"] extends 0
	? false
	: T[0] extends U[0]
		? GreaterThanDigits<Shift<T>, Shift<U>>
		: UF[TF["length"]] extends undefined
			? true
			: false;

type GreaterThan<
	T extends number,
	U extends number,
	TA extends number[] = NumberToArray<T>,
	UA extends number[] = NumberToArray<U>,
> = T extends U
	? false
	: TA["length"] extends UA["length"]
		? GreaterThanDigits<TA, UA>
		: UA[TA["length"]] extends undefined
			? true
			: false;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<GreaterThan<1, 0>, true>>,
	Expect<Equal<GreaterThan<5, 4>, true>>,
	Expect<Equal<GreaterThan<4, 5>, false>>,
	Expect<Equal<GreaterThan<0, 0>, false>>,
	Expect<Equal<GreaterThan<10, 9>, true>>,
	Expect<Equal<GreaterThan<20, 20>, false>>,
	Expect<Equal<GreaterThan<10, 100>, false>>,
	Expect<Equal<GreaterThan<111, 11>, true>>,
	Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
