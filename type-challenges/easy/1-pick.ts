/*
  4 - Pick
  -------
  by Anthony Fu (@antfu) #easy #union #built-in

  ### Question

  Implement the built-in `Pick<T, K>` generic without using it.

  Constructs a type by picking the set of properties `K` from `T`

  For example:

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```

  > View on GitHub: https://tsch.js.org/4
*/

/* _____________ Your Code Here _____________ */

type MyPick<T extends object, K extends keyof T> = {
	[Key in K]: T[Key];
};

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<Expected1, MyPick<Todo, "title">>>,
	Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>,
	// @ts-expect-error filtering out all objects returns never
	MyPick<Todo, "title" | "completed" | "invalid">,
];

type Todo = {
	title: string;
	description: string;
	completed: boolean;
};

type Expected1 = {
	title: string;
};

type Expected2 = {
	title: string;
	completed: boolean;
};

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4/answer
  > View solutions: https://tsch.js.org/4/solutions
  > More Challenges: https://tsch.js.org
*/
