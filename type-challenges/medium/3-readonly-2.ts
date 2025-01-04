/*
  8 - Readonly 2
  -------
  by Anthony Fu (@antfu) #medium #readonly #object-keys

  ### Question

  Implement a generic `MyReadonly2<T, K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to Readonly. When `K` is not provided, it should make all properties readonly just like the normal `Readonly<T>`.

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```

  > View on GitHub: https://tsch.js.org/8
*/

/* _____________ Your Code Here _____________ */

type MyReadonly2<T extends object, K extends keyof T = never> = [K] extends [
	never,
]
	? {
			readonly [Key in keyof T]: T[Key];
		}
	: {
			[Key in keyof T as Key extends K ? never : Key]: T[Key];
		} & {
			readonly [Key in keyof T as Key extends K ? Key : never]: T[Key];
		};

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Alike, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
	Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
	Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>,
	Expect<Alike<MyReadonly2<Todo2, "description">, Expected>>,
];

// @ts-expect-error invalid arguments
type _error = MyReadonly2<Todo1, "title" | "invalid">;

type Todo1 = {
	title: string;
	description?: string;
	completed: boolean;
};

type Todo2 = {
	readonly title: string;
	description?: string;
	completed: boolean;
};

type Expected = {
	readonly title: string;
	readonly description?: string;
	completed: boolean;
};

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8/answer
  > View solutions: https://tsch.js.org/8/solutions
  > More Challenges: https://tsch.js.org
*/
