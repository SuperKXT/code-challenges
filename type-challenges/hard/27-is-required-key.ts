/*
  2857 - IsRequiredKey
  -------
  by jiangshan (@jiangshanmeta) #hard #utils

  ### Question

  Implement a generic ```IsRequiredKey<T, K>```  that return whether ```K``` are required keys of ```T``` .

  For example

  ```typescript
  type A = IsRequiredKey<{ a: number, b?: string },'a'> // true
  type B = IsRequiredKey<{ a: number, b?: string },'b'> // false
  type C = IsRequiredKey<{ a: number, b?: string },'b' | 'a'> // false
  ```

  > View on GitHub: https://tsch.js.org/2857
*/

/* _____________ Your Code Here _____________ */

type Req<T> = {
	[K in keyof T]-?: T[K];
};

type IsRequiredKey<T, K extends keyof T> = T[K] extends Req<T>[K]
	? true
	: false;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "a">, true>>,
	Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "b">, false>>,
	Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "b" | "a">, false>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2857/answer
  > View solutions: https://tsch.js.org/2857/solutions
  > More Challenges: https://tsch.js.org
*/
