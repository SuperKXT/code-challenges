/*
  55 - Union to Intersection
  -------
  by Zheeeng (@zheeeng) #hard #utils #infer

  ### Question

  Implement the advanced util type `UnionToIntersection<U>`

  For example

  ```ts
  type I = Union2Intersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
  ```

  > View on GitHub: https://tsch.js.org/55
*/

/* _____________ Your Code Here _____________ */

// TODO RETRY
type UnionToIntersection<U> = (
	U extends U ? (arg: U) => unknown : never
) extends (arg: infer I) => void
	? I
	: never;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<UnionToIntersection<"foo" | 42 | true>, "foo" & 42 & true>>,
	Expect<
		Equal<
			UnionToIntersection<(() => "foo") | ((i: 42) => true)>,
			(() => "foo") & ((i: 42) => true)
		>
	>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/55/answer
  > View solutions: https://tsch.js.org/55/solutions
  > More Challenges: https://tsch.js.org
*/
