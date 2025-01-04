/*
  869 - DistributeUnions
  -------
  by Gabriel Vergnaud (@gvergnaud) #extreme

  ### Question

  Implement a type `Distribute Unions`, that turns a type of data structure containing union types into a union of
  all possible types of permitted data structures that don't contain any union. The data structure can be any
  combination of objects and tuples on any level of nesting.

  For example:

  ```ts
  type T1 = DistributeUnions<[1 | 2, 'a' | 'b']>
  =>   [1, 'a'] | [2, 'a'] | [1, 'b'] | [2, 'b']

  type T2 = DistributeUnions<{ type: 'a', value: number | string } | { type: 'b', value: boolean }>
  =>  | { type 'a', value: number }
      | { type 'a', value: string }
      | { type 'b', value: boolean }

  type T3 = DistributeUnions<[{ value: 'a' | 'b' },  { x: { y: 2 | 3  } }] | 17>
  =>  | [{ value: 'a' },  { x: { y: 2  } }]
      | [{ value: 'a' },  { x: { y: 3  } }]
      | [{ value: 'b' },  { x: { y: 2  } }]
      | [{ value: 'b' },  { x: { y: 3  } }]
      | 17
  ```

  For context, this type can be very useful if you want to exclude a case on deep data structures:

  ```ts
  type ExcludeDeep<A, B> = Exclude<DistributeUnions<A>, B>

  type T0 = ExcludeDeep<[{ value: 'a' | 'b' },  { x: { y: 2 | 3  } }] | 17, [{ value: 'a' },  any]>
  //  =>  | [{ value: 'b' },  { x: { y: 2  } }]
  //      | [{ value: 'b' },  { x: { y: 3  } }]
  //      | 17
  ```

  > View on GitHub: https://tsch.js.org/869
*/

/* _____________ Your Code Here _____________ */

type Merge<O> = { [K in keyof O]: O[K] };

type ArrHelper<H, T extends unknown[]> = H extends H
	? [H, ...DistributeArray<T>]
	: never;

type DistributeArray<A extends unknown[]> = A extends [infer H, ...infer T]
	? ArrHelper<DistributeUnions<H>, T>
	: [];

type ObjHelper<K, V> = V extends V ? Record<K & string, V> : never;

type DistributeObject<O extends object, K extends keyof O = keyof O> = [
	K,
] extends [never]
	? {}
	: K extends K
		? ObjHelper<K, DistributeUnions<O[K]>> & DistributeObject<Omit<O, K>>
		: never;

type DistributeUnions<T> = T extends unknown[]
	? DistributeArray<T>
	: T extends object
		? Merge<DistributeObject<T>>
		: T;

// TODO retry
type _1 = DistributeUnions<[0, 1 | 2] | [3 | 4]>;
//   ^?

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	// Already distributed unions should stay the same:
	Expect<Equal<DistributeUnions<1>, 1>>,
	Expect<Equal<DistributeUnions<string>, string>>,
	Expect<Equal<DistributeUnions<1 | 2>, 1 | 2>>,
	Expect<
		Equal<
			DistributeUnions<"b" | { type: "a" } | [1]>,
			"b" | { type: "a" } | [1]
		>
	>,
	// tuples:
	Expect<Equal<DistributeUnions<[1 | 2, 3]>, [1, 3] | [2, 3]>>,
	Expect<
		Equal<
			DistributeUnions<[1 | 2, "a" | "b"]>,
			[1, "a"] | [1, "b"] | [2, "a"] | [2, "b"]
		>
	>,
	Expect<
		Equal<
			DistributeUnions<[1 | 2, "a" | "b", false | true]>,
			| [1, "a", false]
			| [1, "a", true]
			| [1, "b", false]
			| [1, "b", true]
			| [2, "a", false]
			| [2, "a", true]
			| [2, "b", false]
			| [2, "b", true]
		>
	>,
	// objects
	Expect<
		Equal<
			DistributeUnions<{ x: "a" | "b"; y: "c" | "d" }>,
			| { x: "a"; y: "c" }
			| { x: "a"; y: "d" }
			| { x: "b"; y: "c" }
			| { x: "b"; y: "d" }
		>
	>,
	Expect<
		Equal<
			DistributeUnions<
				{ type: "a"; value: number | string } | { type: "b"; value: boolean }
			>,
			| { type: "a"; value: string }
			| { type: "a"; value: number }
			| { type: "b"; value: false }
			| { type: "b"; value: true }
		>
	>,
	Expect<
		Equal<
			DistributeUnions<
				| {
						type: "a";
						option: { kind: "none" } | { kind: "some"; value: "x" | "y" };
				  }
				| { type: "b"; msg: string }
			>,
			| { type: "b"; msg: string }
			| { type: "a"; option: { kind: "none" } }
			| { type: "a"; option: { kind: "some"; value: "x" } }
			| { type: "a"; option: { kind: "some"; value: "y" } }
		>
	>,
	// mixed structures:
	Expect<
		Equal<
			DistributeUnions<
				[false | true, { value: "a" | "b" }, { x: { y: 2 | 3 } }]
			>,
			| [false, { value: "a" }, { x: { y: 2 } }]
			| [false, { value: "a" }, { x: { y: 3 } }]
			| [false, { value: "b" }, { x: { y: 2 } }]
			| [false, { value: "b" }, { x: { y: 3 } }]
			| [true, { value: "a" }, { x: { y: 2 } }]
			| [true, { value: "a" }, { x: { y: 3 } }]
			| [true, { value: "b" }, { x: { y: 2 } }]
			| [true, { value: "b" }, { x: { y: 3 } }]
		>
	>,
	Expect<
		Equal<
			DistributeUnions<17 | [10 | { value: "a" | "b" }, { x: { y: 2 | 3 } }]>,
			| 17
			| [10, { x: { y: 2 } }]
			| [10, { x: { y: 3 } }]
			| [{ value: "a" }, { x: { y: 2 } }]
			| [{ value: "a" }, { x: { y: 3 } }]
			| [{ value: "b" }, { x: { y: 2 } }]
			| [{ value: "b" }, { x: { y: 3 } }]
		>
	>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/869/answer
  > View solutions: https://tsch.js.org/869/solutions
  > More Challenges: https://tsch.js.org
*/
