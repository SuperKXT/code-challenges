/** cSpell: disable */
/* eslint-disable @typescript-eslint/no-namespace */
/*
  14188 - Run-length encoding
  -------
  by Hen Hedymdeith (@alfaproxima) #hard

  ### Question

  Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
  Also make a decoder for that string.

  > View on GitHub: https://tsch.js.org/14188
*/

/* _____________ Your Code Here _____________ */

type RepeatString<
	Length extends number,
	Str extends string,
	Count extends 1[] = [],
> = Count["length"] extends Length
	? ""
	: `${Str}${RepeatString<Length, Str, [...Count, 1]>}`;

namespace RLE {
	export type Encode<
		Str extends string,
		Last extends string = "",
		Count extends 1[] = [1],
		Encoded extends string = "",
	> = Str extends `${infer First}${infer Rest}`
		? First extends Last
			? Encode<Rest, Last, [...Count, 1], Encoded>
			: Encode<
					Rest,
					First,
					[1],
					`${Encoded}${Count["length"] extends 1 ? "" : Count["length"]}${Last}`
				>
		: `${Encoded}${Count["length"] extends 1 ? "" : Count["length"]}${Last}`;
	export type Decode<
		Str extends string,
		Decoded extends string = "",
	> = Str extends `${infer Size extends number}${infer Char}${infer Rest}`
		? Decode<Rest, `${Decoded}${RepeatString<Size, Char>}`>
		: Str extends `${infer First}${infer Rest}`
			? Decode<Rest, `${Decoded}${First}`>
			: Decoded;
}

type _ = RLE.Encode<"AAABCCXXXXXXY">;
//   ^?

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	// Raw string -> encoded string
	Expect<Equal<RLE.Encode<"AAABCCXXXXXXY">, "3AB2C6XY">>,

	// Encoded string -> decoded string
	Expect<Equal<RLE.Decode<"3AB2C6XY">, "AAABCCXXXXXXY">>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14188/answer
  > View solutions: https://tsch.js.org/14188/solutions
  > More Challenges: https://tsch.js.org
*/
