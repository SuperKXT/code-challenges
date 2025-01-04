/*
  2949 - ObjectFromEntries
  -------
  by jiangshan (@jiangshanmeta) #hard #object

  ### Question

  Implement the type version of ```Object.fromEntries```

  For example:

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }

  type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];

  type result = ObjectFromEntries<ModelEntries> // expected to be Model
  ```

  > View on GitHub: https://tsch.js.org/2949
*/

/* _____________ Your Code Here _____________ */

type ObjectFromEntries<T extends [string, unknown]> = {
	[K in T as K[0]]: K[1];
};

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

type _cases = [Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2949/answer
  > View solutions: https://tsch.js.org/2949/solutions
  > More Challenges: https://tsch.js.org
*/
