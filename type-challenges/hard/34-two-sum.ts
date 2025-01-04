/*
  8804 - Two Sum
  -------
  by PsiloLau (@Psilocine) #hard #array #math

  ### Question

  Given an array of integers `nums` and an integer `target`, return true if two numbers such that they add up to `target`.

  For example

  ```ts
  type sum1 = TwoSum<[3, 2, 4], 6> // true
  type sum2 = TwoSum<[2, 7, 11, 15], 15> // false
  ```

  > View on GitHub: https://tsch.js.org/8804
*/

/* _____________ Your Code Here _____________ */

type CreateTuple<T extends number, R extends 1[] = []> = R["length"] extends T
	? R
	: CreateTuple<T, [...R, 1]>;

type AddCheck<F extends number, S extends number, U extends number> = [
	...CreateTuple<F>,
	...CreateTuple<S>,
]["length"] extends U
	? true
	: false;

type TwoSum<T extends number[], U extends number> = T extends [
	infer F extends number,
	infer S extends number,
	...infer R extends number[],
]
	? AddCheck<F, S, U> extends true
		? true
		: TwoSum<[F, ...R], U> extends true
			? true
			: TwoSum<[S, ...R], U>
	: false;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<TwoSum<[3, 3], 6>, true>>,
	Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
	Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
	Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
	Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
	Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
	Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
	Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
	Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
	Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
	Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
	Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8804/answer
  > View solutions: https://tsch.js.org/8804/solutions
  > More Challenges: https://tsch.js.org
*/
