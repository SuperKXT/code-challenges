/* eslint-disable @typescript-eslint/ban-types */
/*
  151 - Query String Parser
  -------
  by Pig Fang (@g-plane) #extreme #template-literal

  ### Question

  You're required to implement a type-level parser to parse URL query string into a object literal type.

  Some detailed requirements:

  - Value of a key in query string can be ignored but still be parsed to `true`. For example, `'key'` is without value, so the parser result is `{ key: true }`.
  - Duplicated keys must be merged into one. If there are different values with the same key, values must be merged into a tuple type.
  - When a key has only one value, that value can't be wrapped into a tuple type.
  - If values with the same key appear more than once, it must be treated as once. For example, `key=value&key=value` must be treated as `key=value` only.

  > View on GitHub: https://tsch.js.org/151
*/

/* _____________ Your Code Here _____________ */

type CombineObj<K extends string, V, O extends object> = Prettify<
	{
		[key in K]: key extends keyof O
			? O[key] extends any[]
				? V extends O[key][keyof O[key]]
					? O[key]
					: [...O[key], V]
				: V extends O[key]
				? V
				: [O[key], V]
			: V;
	} & Omit<O, K>
>;

type QueryObject<
	T extends string,
	O extends object = {}
> = T extends `${infer F}=${infer R}`
	? CombineObj<F, R, O>
	: CombineObj<T, true, O>;

type ParseQueryString<T extends string, O extends object = {}> = T extends ''
	? O
	: T extends `${infer F}&${infer R}`
	? ParseQueryString<R, QueryObject<F, O>>
	: ParseQueryString<'', QueryObject<T, O>>;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from '@type-challenges/utils';

type _cases = [
	Expect<Equal<ParseQueryString<''>, {}>>,
	Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
	Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
	Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
	Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
	Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
	Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
	Expect<
		Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>
	>,
	Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
	Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
	Expect<Equal<ParseQueryString<'k1=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'] }>>,
	Expect<
		Equal<
			ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>,
			{ k1: ['v1', 'v2']; k2: 'v1' }
		>
	>,
	Expect<
		Equal<
			ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>,
			{ k1: ['v1', 'v2', 'v3']; k2: 'v2' }
		>
	>,
	Expect<Equal<ParseQueryString<'k1=v1&k1'>, { k1: ['v1', true] }>>,
	Expect<Equal<ParseQueryString<'k1&k1=v1'>, { k1: [true, 'v1'] }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/151/answer
  > View solutions: https://tsch.js.org/151/solutions
  > More Challenges: https://tsch.js.org
*/
