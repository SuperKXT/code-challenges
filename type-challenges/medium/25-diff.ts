/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Get an `Object` that is the difference between `O` & `O1`

  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

type Diff<
	O extends Record<string, unknown>,
	O1 extends Record<string, unknown>,
> = {
	[K in keyof O | keyof O1 as K extends keyof O & keyof O1
		? never
		: K]: K extends keyof O ? O[K] : K extends keyof O1 ? O1[K] : never;
};

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
	name: string;
	age: string;
};
type Bar = {
	name: string;
	age: string;
	gender: number;
};
type Coo = {
	name: string;
	gender: number;
};

type _cases = [
	Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
	Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
	Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
	Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/
