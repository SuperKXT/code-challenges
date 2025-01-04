/*
  2946 - ObjectEntries
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement the type version of ```Object.entries```

  For example

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
  ```

  > View on GitHub: https://tsch.js.org/2946
*/

/* _____________ Your Code Here _____________ */

type ObjectEntries<T extends object, U = Required<T>> = {
	[K in keyof U]: [K, [U[K]] extends [never] ? undefined : U[K]];
}[keyof U];

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type Model = {
	name: string;
	age: number;
	locations: string[] | null;
};

type ModelEntries =
	| ["name", string]
	| ["age", number]
	| ["locations", string[] | null];

type _cases = [
	Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
	Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
	Expect<Equal<ObjectEntries<{ key?: undefined }>, ["key", undefined]>>,
	Expect<Equal<ObjectEntries<{ key: undefined }>, ["key", undefined]>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2946/answer
  > View solutions: https://tsch.js.org/2946/solutions
  > More Challenges: https://tsch.js.org
*/
