/*
  3057 - Push
  -------
  by jiangshan (@jiangshanmeta) #easy #array

  ### Question

  Implement the generic version of ```Array.push```

  For example:

  ```typescript
  type Result = Push<[1, 2], '3'> // [1, 2, '3']
  ```

  > View on GitHub: https://tsch.js.org/3057
*/

/* _____________ Your Code Here _____________ */

type _2 = boolean extends any[] ? true : false;
//   ^?
type Push<T extends any[], U> = [...T, U];

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from '@type-challenges/utils';

type _cases = [
	Expect<Equal<Push<[], 1>, [1]>>,
	Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
	Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3057/answer
  > View solutions: https://tsch.js.org/3057/solutions
  > More Challenges: https://tsch.js.org
*/
