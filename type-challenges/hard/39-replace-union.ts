/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/*
  13580 - Replace Union
  -------
  by Konstantin Barabanov (@crutch12) #hard

  ### Question

  Given an `union of types` and `array of type pairs` to replace (`[[string, number], [Date, null]]`), return a new union replaced with the `type pairs`.

  > View on GitHub: https://tsch.js.org/13580
*/

/* _____________ Your Code Here _____________ */

type UnionReplace<T, U extends readonly [unknown, unknown][]> = U extends [
	infer F extends [unknown, unknown],
	...infer Rest extends [unknown, unknown][],
]
	? UnionReplace<F[0] extends T ? Exclude<T, F[0]> | F[1] : T, Rest>
	: T;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	// string -> null
	Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

	// Date -> string; Function -> undefined
	Expect<
		Equal<
			UnionReplace<
				Function | Date | object,
				[[Date, string], [Function, undefined]]
			>,
			undefined | string | object
		>
	>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/13580/answer
  > View solutions: https://tsch.js.org/13580/solutions
  > More Challenges: https://tsch.js.org
*/
