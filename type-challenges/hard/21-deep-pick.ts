/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/*
  956 - DeepPick
  -------
  by hiroya iizuka (@hiroyaiizuka) #hard #deep

  ### Question

  Implement a type DeepPick, that extends Utility types `Pick`.
  A type takes two arguments.


  For example:

  ```

  type obj = {
    name: 'hoge',
    age: 20,
    friend: {
      name: 'fuga',
      age: 30,
      family: {
        name: 'baz',
        age: 1
      }
    }
  }

  type T1 = DeepPick<obj, 'name'>   // { name : 'hoge' }
  type T2 = DeepPick<obj, 'name' | 'friend.name'>  // { name : 'hoge' } & { friend: { name: 'fuga' }}
  type T3 = DeepPick<obj, 'name' | 'friend.name' |  'friend.family.name'>  // { name : 'hoge' } &  { friend: { name: 'fuga' }} & { friend: { family: { name: 'baz' }}}

  ```

  > View on GitHub: https://tsch.js.org/956
*/

/* _____________ Your Code Here _____________ */

type UnionToIntersection<U> = (
	U extends unknown ? (k: U) => void : never
) extends (k: infer R) => void
	? R
	: never;

type DeepPick<
	T extends Record<string, unknown>,
	U extends string,
> = UnionToIntersection<
	U extends keyof T
		? Pick<T, U>
		: U extends `${infer F extends keyof T & string}.${infer R}`
			? T[F] extends Record<string, unknown>
				? Utils.prettify<{ [K in F]: DeepPick<T[F], R> }>
				: Pick<T, F>
			: never
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";
import type { Utils } from "../../types/utils.types.js";

type TObj = {
	a: number;
	b: string;
	c: boolean;
	obj: {
		d: number;
		e: string;
		f: boolean;
		obj2: {
			g: number;
			h: string;
			i: boolean;
		};
	};
	obj3: {
		j: number;
		k: string;
		l: boolean;
	};
};

type _cases = [
	Expect<Equal<DeepPick<TObj, "">, unknown>>,
	Expect<Equal<DeepPick<TObj, "a">, { a: number }>>,
	Expect<Equal<DeepPick<TObj, "a" | "">, { a: number } & unknown>>,
	Expect<
		Equal<DeepPick<TObj, "a" | "obj.e">, { a: number } & { obj: { e: string } }>
	>,
	Expect<
		Equal<
			DeepPick<TObj, "a" | "obj.e" | "obj.obj2.i">,
			{ a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }
		>
	>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/956/answer
  > View solutions: https://tsch.js.org/956/solutions
  > More Challenges: https://tsch.js.org
*/
