/*
  5317 - LastIndexOf
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Implement the type version of ```Array.lastIndexOf```, ```LastIndexOf<T, U>```  takes an Array ```T```, any ```U``` and returns the index of the last ```U``` in Array ```T```

  For example:

  ```typescript
  type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
  type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
  ```

  > View on GitHub: https://tsch.js.org/5317
*/

/* _____________ Your Code Here _____________ */

type Eq<T, U> =
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
	(<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2
		? true
		: false;

type LastIndexOf<T extends unknown[], U> = T extends [...infer Rest, infer Last]
	? Eq<Last, U> extends true
		? Rest["length"]
		: LastIndexOf<Rest, U>
	: -1;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
	Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
	Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
	Expect<Equal<LastIndexOf<[string, 2, number, "a", number, 1], number>, 4>>,

	Expect<Equal<LastIndexOf<[string, any, 1, number, "a", any, 1], any>, 5>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5317/answer
  > View solutions: https://tsch.js.org/5317/solutions
  > More Challenges: https://tsch.js.org
*/
