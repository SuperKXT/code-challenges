/*
  4484 - IsTuple
  -------
  by jiangshan (@jiangshanmeta) #medium #tuple

  ### Question

  Implement a type ```IsTuple```, which takes an input type ```T``` and returns whether ```T``` is tuple type.

  For example:

  ```typescript
  type case1 = IsTuple<[number]> // true
  type case2 = IsTuple<readonly [number]> // true
  type case3 = IsTuple<number[]> // false
  ```

  > View on GitHub: https://tsch.js.org/4484
*/

/* _____________ Your Code Here _____________ */

type _IsTuple<T> = [T] extends [never]
	? false
	: T extends []
		? true
		: T extends [unknown, ...unknown[]]
			? true
			: T extends readonly [unknown, ...unknown[]]
				? true
				: false;

type IsTuple<T> = [T] extends [never]
	? false
	: T extends readonly unknown[]
		? number extends T["length"]
			? false
			: true
		: false;

type _ = IsTuple<readonly [1]>;
//   ^?
/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<IsTuple<[]>, true>>,
	Expect<Equal<IsTuple<[number]>, true>>,
	Expect<Equal<IsTuple<readonly [1]>, true>>,
	Expect<Equal<IsTuple<{ length: 1 }>, false>>,
	Expect<Equal<IsTuple<number[]>, false>>,
	Expect<Equal<IsTuple<never>, false>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4484/answer
  > View solutions: https://tsch.js.org/4484/solutions
  > More Challenges: https://tsch.js.org
*/
