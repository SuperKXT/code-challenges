/*
  741 - Sort
  -------
  by Sg (@suica) #extreme #infer #array

  ### Question

  In this challenge, you are required to sort natural number arrays in either ascend order or descent order.

  Ascend order examples:
  ```ts
  Sort<[]> // []
  Sort<[1]> // [1]
  Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]> //  [2, 4, 5, 6, 6, 6, 7, 8, 9]
  ```

  The `Sort` type should also accept a boolean type. When it is `true`, the sorted result should be in descent order. Some examples:

  ```ts
  Sort<[3, 2, 1], true> // [3, 2, 1]
  Sort<[3, 2, 0, 1, 0, 0, 0], true> // [3, 2, 1, 0, 0, 0, 0]
  ```

  Extra challenges:
  1. Support natural numbers with 15+ digits.
  2. Support float numbers.

  > View on GitHub: https://tsch.js.org/741
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

type CompareDigitDigits<
	T extends number[],
	U extends number[],
	TF extends number[] = Fill<T[0]>,
	UF extends number[] = Fill<U[0]>,
> = T["length"] extends 0
	? "same"
	: T[0] extends U[0]
		? CompareDigitDigits<Shift<T>, Shift<U>>
		: UF[TF["length"]] extends undefined
			? "greater"
			: "lesser";

export type CompareNum<
	T extends number,
	U extends number,
	TA extends number[] = NumberToArray<T>,
	UA extends number[] = NumberToArray<U>,
> = T extends U
	? "equal"
	: TA["length"] extends UA["length"]
		? CompareDigitDigits<TA, UA>
		: UA[TA["length"]] extends undefined
			? "greater"
			: "lesser";

type SmallestOrGreatest<
	Union extends number,
	IsGreatest extends boolean,
	V extends number = Union,
> = Union extends Union
	? [
			V extends V
				? CompareNum<V, Union> extends (
						IsGreatest extends true ? "greater" : "lesser"
					)
					? V
					: never
				: never,
		] extends [never]
		? Union
		: never
	: never;

type Without<T extends number[], U extends number> = T extends [
	infer F extends number,
	...infer R extends number[],
]
	? F extends U
		? R
		: Without<[...R, F], U>
	: never;

type Sort<
	T extends number[],
	Desc extends boolean = false,
	Sorted extends number[] = [],
	Union extends number = T[number],
	Current extends number = SmallestOrGreatest<Union, Desc>,
> = [Union] extends [never]
	? Sorted
	: Sort<Without<T, Current>, Desc, [...Sorted, Current]>;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<Sort<[]>, []>>,
	Expect<Equal<Sort<[1]>, [1]>>,
	Expect<Equal<Sort<[2, 1]>, [1, 2]>>,
	Expect<Equal<Sort<[0, 0, 0]>, [0, 0, 0]>>,
	Expect<Equal<Sort<[1, 2, 3]>, [1, 2, 3]>>,
	Expect<Equal<Sort<[3, 2, 1]>, [1, 2, 3]>>,
	Expect<Equal<Sort<[3, 2, 1, 2]>, [1, 2, 2, 3]>>,
	Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0]>, [0, 0, 0, 0, 1, 2, 3]>>,
	Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>, [2, 4, 5, 6, 6, 6, 7, 8, 9]>>,
	Expect<Equal<Sort<[1, 1, 2, 1, 1, 1, 1, 1, 1]>, [1, 1, 1, 1, 1, 1, 1, 1, 2]>>,
	Expect<Equal<Sort<[], true>, []>>,
	Expect<Equal<Sort<[1], true>, [1]>>,
	Expect<Equal<Sort<[2, 1], true>, [2, 1]>>,
	Expect<Equal<Sort<[0, 0, 0], true>, [0, 0, 0]>>,
	Expect<Equal<Sort<[1, 2, 3], true>, [3, 2, 1]>>,
	Expect<Equal<Sort<[3, 2, 1], true>, [3, 2, 1]>>,
	Expect<Equal<Sort<[3, 2, 1, 2], true>, [3, 2, 2, 1]>>,
	Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0], true>, [3, 2, 1, 0, 0, 0, 0]>>,
	Expect<
		Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9], true>, [9, 8, 7, 6, 6, 6, 5, 4, 2]>
	>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/741/answer
  > View solutions: https://tsch.js.org/741/solutions
  > More Challenges: https://tsch.js.org
*/
