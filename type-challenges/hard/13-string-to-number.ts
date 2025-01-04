/*
  300 - String to Number
  -------
  by Pig Fang (@g-plane) #hard #template-literal

  ### Question

  Convert a string literal to a number, which behaves like `Number.parseInt`.

  > View on GitHub: https://tsch.js.org/300
*/

/* _____________ Your Code Here _____________ */

type ToNumber<S extends string> = `${S}` extends `${infer F extends number}`
	? `${F}` extends `${infer I extends number}.${string}`
		? I
		: F
	: never;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<ToNumber<"0">, 0>>,
	Expect<Equal<ToNumber<"5">, 5>>,
	Expect<Equal<ToNumber<"12">, 12>>,
	Expect<Equal<ToNumber<"27">, 27>>,
	Expect<Equal<ToNumber<"18@7_$%">, never>>,
	Expect<Equal<ToNumber<"12.5">, 12>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/300/answer
  > View solutions: https://tsch.js.org/300/solutions
  > More Challenges: https://tsch.js.org
*/
