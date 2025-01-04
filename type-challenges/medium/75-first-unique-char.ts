/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > View on GitHub: https://tsch.js.org/9286
*/

/* _____________ Your Code Here _____________ */

type __FirstUniqueCharIndex<
	T extends string,
	A extends string = "",
	Idx extends 1[] = [],
> = T extends `${infer F}${infer O}`
	? __FirstUniqueCharIndex<
			O,
			A extends `${infer L}${F}:[${infer I}]${infer R}`
				? `${L}${R}${F}:[${I} | ${Idx["length"]}]`
				: `${A}${F}:[${Idx["length"]}]`,
			[...Idx, 1]
		>
	: A extends `${string}:[${infer I extends number}]${string}`
		? I
		: -1;

type FirstUniqueCharIndex<
	T extends string,
	Idx extends string[] = [],
> = T extends `${infer F}${infer R}`
	? F extends Idx[number]
		? FirstUniqueCharIndex<R, [...Idx, F]>
		: R extends `${string}${F}${string}`
			? FirstUniqueCharIndex<R, [...Idx, F]>
			: Idx["length"]
	: -1;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<FirstUniqueCharIndex<"leetcode">, 0>>,
	Expect<Equal<FirstUniqueCharIndex<"loveleetcode">, 2>>,
	Expect<Equal<FirstUniqueCharIndex<"aabb">, -1>>,
	Expect<Equal<FirstUniqueCharIndex<"">, -1>>,
	Expect<Equal<FirstUniqueCharIndex<"aaa">, -1>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9286/answer
  > View solutions: https://tsch.js.org/9286/solutions
  > More Challenges: https://tsch.js.org
*/
