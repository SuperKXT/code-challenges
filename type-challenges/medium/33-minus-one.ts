/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

type RemoveLeadingZeros<T extends string> = T extends `0${infer V}`
	? V extends ""
		? "0"
		: RemoveLeadingZeros<V>
	: T;
type ParseInt<T extends string> =
	RemoveLeadingZeros<T> extends `${infer U extends number}` ? U : never;
type ReverseString<T extends string> = T extends `${infer L}${infer R}`
	? `${ReverseString<R>}${L}`
	: "";

type PositiveMinusOne<T extends string> = T extends `${infer D extends
	number}${infer R}`
	? D extends 0
		? `9${PositiveMinusOne<R>}`
		: `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][D]}${R}`
	: never;

type NegativeMinusOne<T extends string> = T extends `${infer D extends
	number}${infer R}`
	? D extends 9
		? `0${NegativeMinusOne<R>}`
		: `${[1, 2, 3, 4, 5, 6, 7, 8, 9][D]}${R}`
	: never;

type MinusOne<T extends number> = T extends 0
	? -1
	: `${T}` extends `-${infer U extends number}`
		? ParseInt<`-${ReverseString<NegativeMinusOne<ReverseString<`${U}`>>>}`>
		: ParseInt<ReverseString<PositiveMinusOne<ReverseString<`${T}`>>>>;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<MinusOne<1>, 0>>,
	Expect<Equal<MinusOne<55>, 54>>,
	Expect<Equal<MinusOne<3>, 2>>,
	Expect<Equal<MinusOne<100>, 99>>,
	Expect<Equal<MinusOne<1101>, 1100>>,
	Expect<Equal<MinusOne<0>, -1>>,
	Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
	Expect<Equal<MinusOne<-1>, -2>>,
	Expect<Equal<MinusOne<-55>, -56>>,
	Expect<Equal<MinusOne<-3>, -4>>,
	Expect<Equal<MinusOne<-100>, -101>>,
	Expect<Equal<MinusOne<-1101>, -1102>>,
	Expect<Equal<MinusOne<-9_007_199_254_740_991>, -9_007_199_254_740_992>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
