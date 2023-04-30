/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #medium #array #promise

  ### Question

  Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.

  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  // expected to be `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
  ```

  > View on GitHub: https://tsch.js.org/20
*/

/* _____________ Your Code Here _____________ */

type MyAwaited<T> = T extends Promise<infer R> ? R : T;

declare function promiseAll<T extends any[]>(
	values: readonly [...T]
): Promise<{
	[K in keyof T]: MyAwaited<T[K]>;
}>;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from '@type-challenges/utils';

const promiseAllTest1 = promiseAll([1, 2, 3] as const);
//    ^?
const promiseAllTest2 = promiseAll([1, 2, Promise.resolve(3)] as const);
//    ^?
const promiseAllTest3 = promiseAll([1, 2, Promise.resolve(3)]);
//    ^?
// eslint-disable-next-line @typescript-eslint/array-type
const promiseAllTest4 = promiseAll<Array<number | Promise<number>>>([1, 2, 3]);
//    ^?

type _cases = [
	Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
	Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
	Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
	Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/20/answer
  > View solutions: https://tsch.js.org/20/solutions
  > More Challenges: https://tsch.js.org
*/