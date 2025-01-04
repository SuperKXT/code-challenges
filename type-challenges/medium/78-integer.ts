/*
  10969 - Integer
  -------
  by HuaBing (@hbcraft) #medium #template-literal

  ### Question

  Please complete type `Integer<T>`, type `T` inherits from `number`, if `T` is an integer return it, otherwise return `never`.

  > View on GitHub: https://tsch.js.org/10969
*/

/* _____________ Your Code Here _____________ */

type Integer<T extends number> = number extends T
	? never
	: `${T}` extends `${number}.${number}`
		? never
		: T;

type _Integer<T extends number> = `${T}` extends `${bigint}` ? T : never;
type __Integer<T extends number> = T extends T & 1 ? T : never;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

// eslint-disable-next-line prefer-const
let x = 1;
// eslint-disable-next-line prefer-const
let y = 1 as const;

type _cases = [
	Expect<Equal<Integer<1>, 1>>,
	Expect<Equal<Integer<1.1>, never>>,
	Expect<Equal<Integer<1.0>, 1>>,
	Expect<Equal<Integer<1.0>, 1>>,
	Expect<Equal<Integer<typeof x>, never>>,
	Expect<Equal<Integer<typeof y>, 1>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/10969/answer
  > View solutions: https://tsch.js.org/10969/solutions
  > More Challenges: https://tsch.js.org
*/
