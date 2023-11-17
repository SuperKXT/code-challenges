/*
  6228 - JSON Parser
  -------
  by Hydration (@hydrati) #extreme #template-literal #json

  ### Question

  You're required to implement a type-level partly parser to parse JSON string into a object literal type.

  Requirements:
   - `Numbers` and `Unicode escape (\uxxxx)` in JSON can be ignored. You needn't to parse them.

  > View on GitHub: https://tsch.js.org/6228
*/

/* _____________ Your Code Here _____________ */

type Merge<T> = { [P in keyof T]: T[P] };

type Escapes = ' ' | '\n' | '\t';
type EscapeMap = { r: '\r'; n: '\n'; b: '\b'; f: '\f' };

type Parse<T extends string> = Eval<T> extends [infer V, unknown] ? V : never;

type Eval<T> = T extends `${Escapes}${infer U}`
	? Eval<U>
	: T extends `true${infer U}`
	  ? [true, U]
	  : T extends `false${infer U}`
	    ? [false, U]
	    : T extends `null${infer U}`
	      ? [null, U]
	      : T extends `"${infer U}`
	        ? EvalString<U>
	        : T extends `${'['}${infer U}`
	          ? EvalArray<U>
	          : T extends `${'{'}${infer U}`
	            ? EvalObject<U>
	            : false;

type EvalString<T, S extends string = ''> = T extends `"${infer U}`
	? [S, U]
	: (
				T extends `\\${infer C}${infer U}`
					? C extends keyof EscapeMap
						? [EscapeMap[C], U]
						: false
					: false
	    ) extends [infer C extends string, infer U]
	  ? EvalString<U, `${S}${C}`>
	  : T extends `${infer C}${infer U}`
	    ? EvalString<U, `${S}${C}`>
	    : false;

type EvalArray<T, A extends unknown[] = []> = T extends `${Escapes}${infer U}`
	? EvalArray<U, A>
	: T extends `]${infer U}`
	  ? [A, U]
	  : T extends `,${infer U}`
	    ? EvalArray<U, A>
	    : Eval<T> extends [infer V, infer U]
	      ? EvalArray<U, [...A, V]>
	      : false;

type EvalObject<
	T,
	K extends string = '',
	O = {},
> = T extends `${Escapes}${infer U}`
	? EvalObject<U, K, O>
	: T extends `}${infer U}`
	  ? [O, U]
	  : T extends `,${infer U}`
	    ? EvalObject<U, K, O>
	    : T extends `"${infer U}`
	      ? Eval<`"${U}`> extends [`${infer KK}`, infer UU]
					? EvalObject<UU, KK, O>
					: false
	      : T extends `:${infer U}`
	        ? Eval<U> extends [infer V, infer UU]
						? EvalObject<UU, '', Merge<{ [P in K]: V } & O>>
						: false
	        : false;

// TODO retry

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from '@type-challenges/utils';

type _cases = [
	Expect<
		Equal<
			Parse<`
      {
        "a": "b",
        "b": false,
        "c": [true, false, "hello", {
          "a": "b",
          "b": false
        }],
        "nil": null
      }
    `>,
			{
				nil: null;
				c: [
					true,
					false,
					'hello',
					{
						a: 'b';
						b: false;
					},
				];
				b: false;
				a: 'b';
			}
		>
	>,
	Expect<Equal<Parse<'{}'>, {}>>,

	Expect<Equal<Parse<'[]'>, []>>,

	Expect<Equal<Parse<'[1]'>, never>>,

	Expect<Equal<Parse<'true'>, true>>,

	Expect<
		Equal<Parse<'["Hello", true, false, null]'>, ['Hello', true, false, null]>
	>,

	Expect<
		Equal<
			Parse<`
      {
        "hello\\r\\n\\b\\f": "world"
      }`>,
			{
				'hello\r\n\b\f': 'world';
			}
		>
	>,

	Expect<Equal<Parse<'{ 1: "world" }'>, never>>,

	Expect<
		Equal<
			Parse<`{ "hello

  world": 123 }`>,
			never
		>
	>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/6228/answer
  > View solutions: https://tsch.js.org/6228/solutions
  > More Challenges: https://tsch.js.org
*/
