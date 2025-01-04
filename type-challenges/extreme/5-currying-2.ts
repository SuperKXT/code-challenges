/* eslint-disable max-params */
/* eslint-disable new-cap */
/*
  462 - Currying 2
  -------
  by Kim (@hubvue) #extreme

  ### Question

  [Currying](https://en.wikipedia.org/wiki/Currying) is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.

  But in our daily life, currying dynamic arguments is also commonly used, for example, the `Function.bind(this, [...params])` API.

  ```ts
  const func = (a: number, b: number, c: number) => {
    return a + b + c
  }

  const bindFunc = func(null, 1, 2)

  const result = bindFunc(3) // result: 6
  ```

  Thus, based on `Currying 1`, we would need to have the dynamic argument version:

  ```ts
  const add = (a: number, b: number, c: number) => a + b + c
  const three = add(1, 1, 1)

  const curriedAdd = DynamicParamsCurrying(add)
  const six = curriedAdd(1, 2, 3)
  const seven = curriedAdd(1, 2)(4)
  const nine = curriedAdd(2)(3)(4)
  ```

  In this challenge, `DynamicParamsCurrying` may take a function with zero to multiple arguments, you need to correctly type it. The returned function may accept at least one argument. When all the arguments as satisfied, it should yield the return type of the original function correctly.

  > View on GitHub: https://tsch.js.org/462
*/

/* _____________ Your Code Here _____________ */

type Combinations<
	T extends unknown[],
	Result extends unknown[] = never,
> = T extends [...infer Rest, unknown]
	? Combinations<Rest, Result | T>
	: Result;

type UnshiftBy<
	T extends unknown[],
	U extends number,
	Idx extends 1[] = [],
> = Idx["length"] extends U
	? T
	: T extends [unknown, ...infer R]
		? UnshiftBy<R, U, [...Idx, 1]>
		: [];

type Curry<Params extends unknown[], Return> = <T extends Combinations<Params>>(
	...args: T
) => T extends Params ? Return : Curry<UnshiftBy<Params, T["length"]>, Return>;

declare function DynamicParamsCurrying<Params extends unknown[], Return>(
	fn: (...args: Params) => Return,
): Curry<Params, Return>;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

const curried1 = DynamicParamsCurrying(
	(_a: string, _b: number, _c: boolean) => true,
);
const curried2 = DynamicParamsCurrying(
	(
		_a: string,
		_b: number,
		_c: boolean,
		_d: boolean,
		_e: boolean,
		_f: string,
		_g: boolean,
	) => true,
);

const curried1Return1 = curried1("123")(123)(true);
const curried1Return2 = curried1("123", 123)(false);
const curried1Return3 = curried1("123", 123, true);

const curried2Return1 = curried2("123")(123)(true)(false)(true)("123")(false);
const curried2Return2 = curried2("123", 123)(true, false)(true, "123")(false);
const curried2Return3 = curried2("123", 123)(true)(false)(true, "123", false);
const curried2Return4 = curried2("123", 123, true)(false, true, "123")(false);
const curried2Return5 = curried2("123", 123, true)(false)(true)("123")(false);
const curried2Return6 = curried2("123", 123, true, false)(true, "123", false);
const curried2Return7 = curried2("123", 123, true, false, true)("123", false);
const curried2Return8 = curried2("123", 123, true, false, true)("123")(false);
const curried2Return9 = curried2("123", 123, true, false, true, "123")(false);
const curried2Return10 = curried2("123", 123, true, false, true, "123", false);

type _cases = [
	Expect<Equal<typeof curried1Return1, boolean>>,
	Expect<Equal<typeof curried1Return2, boolean>>,
	Expect<Equal<typeof curried1Return3, boolean>>,

	Expect<Equal<typeof curried2Return1, boolean>>,
	Expect<Equal<typeof curried2Return2, boolean>>,
	Expect<Equal<typeof curried2Return3, boolean>>,
	Expect<Equal<typeof curried2Return4, boolean>>,
	Expect<Equal<typeof curried2Return5, boolean>>,
	Expect<Equal<typeof curried2Return6, boolean>>,
	Expect<Equal<typeof curried2Return7, boolean>>,
	Expect<Equal<typeof curried2Return8, boolean>>,
	Expect<Equal<typeof curried2Return9, boolean>>,
	Expect<Equal<typeof curried2Return10, boolean>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/462/answer
  > View solutions: https://tsch.js.org/462/solutions
  > More Challenges: https://tsch.js.org
*/
