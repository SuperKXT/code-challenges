/*
  7544 - Construct Tuple
  -------
  by Lo (@LoTwT) #medium #tuple

  ### Question

  Construct a tuple with a given length.

  For example

  ```ts
  type result = ConstructTuple<2> // expect to be [unknown, unkonwn]
  ```

  > View on GitHub: https://tsch.js.org/7544
*/

/* _____________ Your Code Here _____________ */

type ConstructTuple<
	L extends number,
	A extends unknown[] = [],
> = A["length"] extends L ? A : ConstructTuple<L, [...A, unknown]>;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<ConstructTuple<0>, []>>,
	Expect<Equal<ConstructTuple<2>, [unknown, unknown]>>,
	Expect<Equal<ConstructTuple<999>["length"], 999>>,
	// @ts-expect-error too big
	Expect<Equal<ConstructTuple<1000>["length"], 1000>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/7544/answer
  > View solutions: https://tsch.js.org/7544/solutions
  > More Challenges: https://tsch.js.org
*/
