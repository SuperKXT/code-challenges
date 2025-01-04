/*
  2793 - Mutable
  -------
  by jiangshan (@jiangshanmeta) #medium #readonly #object-keys

  ### Question

  Implement the generic ```Mutable<T>``` which makes all properties in ```T``` mutable (not readonly).

  For example

  ```typescript
  interface Todo {
    readonly title: string
    readonly description: string
    readonly completed: boolean
  }

  type MutableTodo = Mutable<Todo> // { title: string; description: string; completed: boolean; }

  ```

  > View on GitHub: https://tsch.js.org/2793
*/

/* _____________ Your Code Here _____________ */

type Mutable<T extends Readonly<object>> = {
	-readonly [K in keyof T]: T[K];
};

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type Todo1 = {
	title: string;
	description: string;
	completed: boolean;
	meta: {
		author: string;
	};
};

type List = [1, 2, 3];

type _cases = [
	Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
	Expect<Equal<Mutable<Readonly<List>>, List>>,
];

type _errors = [
	// @ts-expect-error invalid argument
	Mutable<"string">,
	// @ts-expect-error invalid argument
	Mutable<0>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2793/answer
  > View solutions: https://tsch.js.org/2793/solutions
  > More Challenges: https://tsch.js.org
*/
