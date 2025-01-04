/*
  2759 - RequiredByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement a generic `RequiredByKeys<T,  K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to be required. When `K` is not provided, it should make all properties required just like the normal `Required<T>`.

  For example

  ```typescript
  interface User {
    name?: string
    age?: number
    address?: string
  }

  type UserRequiredName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }

  ```

  > View on GitHub: https://tsch.js.org/2759
*/

/* _____________ Your Code Here _____________ */

type Flat<T extends object> = {
	[K in keyof T]: T[K];
};

type RequiredByKeys<T extends object, K extends keyof T = keyof T> = Flat<
	{
		[Key in K]-?: NonNullable<T[Key]>;
	} & Omit<T, K>
>;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type User = {
	name?: string;
	age?: number;
	address?: string;
};

type UserRequiredName = {
	name: string;
	age?: number;
	address?: string;
};

type UserRequiredNameAndAge = {
	name: string;
	age: number;
	address?: string;
};

type _cases = [
	Expect<Equal<RequiredByKeys<User, "name">, UserRequiredName>>,
	Expect<Equal<RequiredByKeys<User, "name" | "age">, UserRequiredNameAndAge>>,
	Expect<Equal<RequiredByKeys<User>, Required<User>>>,
	// @ts-expect-error invalid keys
	Expect<Equal<RequiredByKeys<User, "name" | "unknown">, UserRequiredName>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2759/answer
  > View solutions: https://tsch.js.org/2759/solutions
  > More Challenges: https://tsch.js.org
*/
