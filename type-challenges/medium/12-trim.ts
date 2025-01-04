/*
  108 - Trim
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `Trim<T>` which takes an exact string type and returns a new string with the whitespace from both ends removed.

  For example

  ```ts
  type trimmed = Trim<'  Hello World  '> // expected to be 'Hello World'
  ```

  > View on GitHub: https://tsch.js.org/108
*/

/* _____________ Your Code Here _____________ */

type Space = " " | "\n" | "\t";
type Trim<S extends string> = S extends
	| `${Space}${infer U}`
	| `${infer U}${Space}`
	? Trim<U>
	: S;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<Trim<"str">, "str">>,
	Expect<Equal<Trim<" str">, "str">>,
	Expect<Equal<Trim<"     str">, "str">>,
	Expect<Equal<Trim<"str   ">, "str">>,
	Expect<Equal<Trim<"     str     ">, "str">>,
	Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>,
	Expect<Equal<Trim<"">, "">>,
	Expect<Equal<Trim<" \n\t ">, "">>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/108/answer
  > View solutions: https://tsch.js.org/108/solutions
  > More Challenges: https://tsch.js.org
*/
