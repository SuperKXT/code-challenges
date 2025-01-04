/*
  4471 - Zip
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  In This Challenge, You should implement a type `Zip<T, U>`, T and U must be `Tuple`
  ```ts
  type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
  ```

  > View on GitHub: https://tsch.js.org/4471
*/

/* _____________ Your Code Here _____________ */

type Zip<T extends unknown[], U extends unknown[]> = T extends [
	infer F,
	...infer R,
]
	? U extends [infer G, ...infer S]
		? [[F, G], ...Zip<R, S>]
		: []
	: [];

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<Zip<[], []>, []>>,
	Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
	Expect<Equal<Zip<[1, 2, 3], ["1", "2"]>, [[1, "1"], [2, "2"]]>>,
	Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
	Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4471/answer
  > View solutions: https://tsch.js.org/4471/solutions
  > More Challenges: https://tsch.js.org
*/
