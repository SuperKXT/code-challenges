/*
  3192 - Reverse
  -------
  by jiangshan (@jiangshanmeta) #medium #tuple

  ### Question

  Implement the type version of ```Array.reverse```

  For example:

  ```typescript
  type a = Reverse<['a', 'b']> // ['b', 'a']
  type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
  ```

  > View on GitHub: https://tsch.js.org/3192
*/

/* _____________ Your Code Here _____________ */

type Reverse<T extends unknown[]> = T extends [infer First, ...infer Rest]
	? [...Reverse<Rest>, First]
	: T;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<Reverse<[]>, []>>,
	Expect<Equal<Reverse<["a", "b"]>, ["b", "a"]>>,
	Expect<Equal<Reverse<["a", "b", "c"]>, ["c", "b", "a"]>>,
];

type _errors = [
	// @ts-expect-error invalid argument
	Reverse<"string">,
	// @ts-expect-error invalid argument
	Reverse<{ key: "value" }>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3192/answer
  > View solutions: https://tsch.js.org/3192/solutions
  > More Challenges: https://tsch.js.org
*/
