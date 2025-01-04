/*
  274 - Integers Comparator
  -------
  by Pig Fang (@g-plane) #extreme #template-literal #math

  ### Question

  Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:

  - If `a` is greater than `b`, type should be `Comparison.Greater`.
  - If `a` and `b` are equal, type should be `Comparison.Equal`.
  - If `a` is lower than `b`, type should be `Comparison.Lower`.

  **Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**

  > View on GitHub: https://tsch.js.org/274
*/

/* _____________ Your Code Here _____________ */

//   ^?

/* _____________ Test Cases _____________ */

import type { Equal, Expect } from "@type-challenges/utils";

// eslint-disable-next-line no-restricted-syntax
enum Comparison {
	Greater,
	Equal,
	Lower,
}

type CreateTuple<
	T extends number,
	Arr extends 1[] = [],
> = Arr["length"] extends T ? Arr : CreateTuple<T, [...Arr, 1]>;

type Unshift<T extends number[]> = T extends [
	number,
	...infer Rest extends number[],
]
	? Rest
	: never;

type NumberToTuple<
	T extends number,
	S extends string = `${T}` extends `-${infer I}` ? I : `${T}`,
	Output extends number[] = [],
> = S extends `${infer F extends number}${infer R}`
	? NumberToTuple<never, R, [...Output, F]>
	: Output;

type DigitComparator<A extends number[], B extends number[]> = A[0] extends B[0]
	? DigitComparator<Unshift<A>, Unshift<B>>
	: CompareTups<CreateTuple<A[0]>, CreateTuple<B[0]>>;

type CompareTups<
	A extends number[],
	B extends number[],
> = A["length"] extends B["length"]
	? DigitComparator<A, B>
	: A[B["length"]] extends undefined
		? Comparison.Lower
		: Comparison.Greater;

type CheckNegative<
	A extends number,
	B extends number,
	TupA extends number[] = NumberToTuple<A>,
	TupB extends number[] = NumberToTuple<B>,
> = `${A}` extends `-${number}`
	? `${B}` extends `-${number}`
		? CompareTups<TupB, TupA>
		: Comparison.Lower
	: `${B}` extends `-${number}`
		? Comparison.Greater
		: CompareTups<TupA, TupB>;

type Comparator<A extends number, B extends number> = A extends B
	? Comparison.Equal
	: CheckNegative<A, B>;

type _cases = [
	Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
	Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
	Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
	Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
	Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
	Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
	Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
	Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
	Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
	Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
	Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
	Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
	Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
	Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
	Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
	Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
	Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

	Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
	Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
	Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
	Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
	Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
	Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

	// Extra tests if you like to challenge yourself!
	Expect<
		Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>
	>,
	Expect<
		Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>
	>,
	Expect<
		Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>
	>,
	Expect<
		Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>
	>,
	Expect<
		Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>
	>,
	Expect<
		Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>
	>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/274/answer
  > View solutions: https://tsch.js.org/274/solutions
  > More Challenges: https://tsch.js.org
*/
