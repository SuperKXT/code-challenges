/* eslint-disable import/first */
/*
  9898 - Appear only once
  -------
  by X.Q. Chen (@brenner8023) #medium

  ### Question

  Find the elements in the target array that appear only once. For example：input: `[1,2,2,3,3,4,5,6,6,6]`，ouput: `[1,4,5]`.

  > View on GitHub: https://tsch.js.org/9898
*/

/* _____________ Your Code Here _____________ */

type AppearOnlyOnce<
	T extends unknown[],
	Skip = never,
	Out extends unknown[] = [],
> = T extends [infer F, ...infer R]
	? F extends R[number] | Skip
		? AppearOnlyOnce<R, Skip | F, Out>
		: AppearOnlyOnce<R, Skip, [...Out, F]>
	: Out;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<AppearOnlyOnce<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
	Expect<Equal<AppearOnlyOnce<[2, 2, 3, 3, 6, 6, 6]>, []>>,
	Expect<Equal<AppearOnlyOnce<[1, 2, 3]>, [1, 2, 3]>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9898/answer
  > View solutions: https://tsch.js.org/9898/solutions
  > More Challenges: https://tsch.js.org
*/
