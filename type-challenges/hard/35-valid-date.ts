/*
  9155 - ValidDate
  -------
  by ch3cknull (@ch3cknull) #hard

  ### Question

  Implement a type `ValidDate`, which takes an input type T and returns whether T is a valid date.

  **Leap year is not considered**

  Good Luck!

  ```ts
  ValidDate<'0102'> // true
  ValidDate<'0131'> // true
  ValidDate<'1231'> // true
  ValidDate<'0229'> // false
  ValidDate<'0100'> // false
  ValidDate<'0132'> // false
  ValidDate<'1301'> // false
  ```

  > View on GitHub: https://tsch.js.org/9155
*/

/* _____________ Your Code Here _____________ */
type MonthDayMap = {
	"01": 31;
	"02": 28;
	"03": 31;
	"04": 30;
	"05": 31;
	"06": 30;
	"07": 31;
	"08": 31;
	"09": 30;
	"10": 31;
	"11": 30;
	"12": 31;
};

type LessThan<
	T extends number,
	U extends number,
	A extends 1[] = [],
> = A["length"] extends T
	? true
	: A["length"] extends U
		? false
		: LessThan<T, U, [...A, 1]>;

type ValidDate<T extends string> = T extends `${infer M1 extends
	number}${infer M2 extends number}${infer D1 extends number}${infer D2 extends
	number}`
	? `${D1}${D2}` extends `${infer D extends number}`
		? `${D1}${D2}` extends "00"
			? false
			: `${M1}${M2}` extends keyof MonthDayMap
				? LessThan<D, MonthDayMap[`${M1}${M2}`]>
				: false
		: false
	: false;

/* _____________ Test Cases _____________ */
// eslint-disable-next-line import/first
import type { Equal, Expect } from "@type-challenges/utils";

type _cases = [
	Expect<Equal<ValidDate<"0102">, true>>,
	Expect<Equal<ValidDate<"0131">, true>>,
	Expect<Equal<ValidDate<"1231">, true>>,
	Expect<Equal<ValidDate<"0229">, false>>,
	Expect<Equal<ValidDate<"0100">, false>>,
	Expect<Equal<ValidDate<"0132">, false>>,
	Expect<Equal<ValidDate<"1301">, false>>,
	Expect<Equal<ValidDate<"0123">, true>>,
	Expect<Equal<ValidDate<"01234">, false>>,
	Expect<Equal<ValidDate<"">, false>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9155/answer
  > View solutions: https://tsch.js.org/9155/solutions
  > More Challenges: https://tsch.js.org
*/
