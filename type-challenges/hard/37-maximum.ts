/*
  9384 - Maximum
  -------
  by ch3cknull (@ch3cknull) #hard #array

  ### Question

  ### Description

  Implement the type `Maximum`, which takes an input type `T`, and returns the maximum value in `T`.

  If `T` is an empty array, it returns `never`. **Negative numbers** are not considered.

  For example:

  ```ts
  Maximum<[]> // never
  Maximum<[0, 2, 1]> // 2
  Maximum<[1, 20, 200, 150]> // 200
  ```

  ### Advanced

  Can you implement type `Minimum` inspired by `Maximum`?

  > View on GitHub: https://tsch.js.org/9384
*/

/* _____________ Your Code Here _____________ */

type CreateTuple<T extends number, A extends 1[] = []> = A["length"] extends T
	? A
	: CreateTuple<T, [...A, 1]>;

type Unshift<T extends 1[]> = T extends [unknown, ...infer R extends 1[]]
	? R
	: never;

type Max<
	A extends number,
	B extends number,
	AT extends 1[] = CreateTuple<A>,
	BT extends 1[] = CreateTuple<B>,
> = B extends A
	? B
	: AT[BT["length"]] extends undefined
		? B
		: BT[AT["length"]] extends undefined
			? A
			: Max<never, never, Unshift<AT>, Unshift<BT>>;

type _Maximum<
	T extends number[],
	Greatest extends number = T[0] extends undefined ? never : T[0],
> = T extends [infer F extends number, ...infer R extends number[]]
	? _Maximum<R, Max<F, Greatest>>
	: Greatest;

type Maximum<
	T extends unknown[],
	U = T[number],
	N extends 1[] = [],
> = T extends []
	? never
	: [U] extends [N["length"]]
		? U
		: Maximum<T, U extends N["length"] ? never : U, [...N, 1]>;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<Maximum<[]>, never>>,
	Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
	Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9384/answer
  > View solutions: https://tsch.js.org/9384/solutions
  > More Challenges: https://tsch.js.org
*/
