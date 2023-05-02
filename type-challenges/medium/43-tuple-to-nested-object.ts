/*
  3188 - Tuple to Nested Object
  -------
  by jiangshan (@jiangshanmeta) #medium #object #tuple

  ### Question

  Given a tuple type ```T``` that only contains string type, and a type ```U```, build an object recursively.

  ```typescript
  type a = TupleToNestedObject<['a'], string> // {a: string}
  type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
  type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
  ```

  > View on GitHub: https://tsch.js.org/3188
*/

/* _____________ Your Code Here _____________ */

type TupleToNestedObject<T extends readonly string[], U> = T extends [
	infer F extends string,
	...infer R extends string[]
]
	? {
			[K in F]: TupleToNestedObject<R, U>;
	  }
	: T extends []
	? U
	: never;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from '@type-challenges/utils';

type _cases = [
	Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
	Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
	Expect<
		Equal<
			TupleToNestedObject<['a', 'b', 'c'], boolean>,
			{ a: { b: { c: boolean } } }
		>
	>,
	Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3188/answer
  > View solutions: https://tsch.js.org/3188/solutions
  > More Challenges: https://tsch.js.org
*/
