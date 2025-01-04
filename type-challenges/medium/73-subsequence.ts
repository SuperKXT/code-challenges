/*
  8987 - Subsequence
  -------
  by jiangshan (@jiangshanmeta) #medium #union

  ### Question

  Given an array of unique elements, return all possible subsequences.

  A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.

  For example:

  ```typescript
  type A = Subsequence<[1, 2]> // [] | [1] | [2] | [1, 2]
  ```

  > View on GitHub: https://tsch.js.org/8987
*/

/* _____________ Your Code Here _____________ */

// TODO RETRY
type Subsequence<
	T extends unknown[],
	Prefix extends unknown[] = [],
> = T extends [infer F, ...infer R]
	? Subsequence<R, Prefix | [...Prefix, F]>
	: Prefix;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
	Expect<
		Equal<
			Subsequence<[1, 2, 3]>,
			[] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3]
		>
	>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8987/answer
  > View solutions: https://tsch.js.org/8987/solutions
  > More Challenges: https://tsch.js.org
*/
