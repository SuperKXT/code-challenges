import type { Equal, Expect } from "@type-challenges/utils";

// Converts a union to an intersection by exploiting the contravariance of the function params
type unionToIntersection<T> = (
	T extends T ? (x: T) => unknown : never
) extends (x: infer U) => unknown
	? U
	: never;

// Gets the "last" member of the union by converting the union into an intersection of functions where the param for each function is one member of the union
// This effectively creates overloaded functions
// Inferring the function param on the overloaded function matches the last overload since TS can not decide which overload to use
// THE ORDER OF THE UNION IS NOT GUARENTEED, SO THE LAST MEMBER IN THE UNION IS NON-DETERMINISTIC AND SOLUTIONS RELYING ON THE ORDER MAY BREAK IN FUTURE TS VERSIONS
type lastInUnion<T> =
	unionToIntersection<T extends unknown ? (x: T) => 0 : never> extends (
		x: infer U,
	) => 0
		? U
		: never;

/* _____________ Test Cases _____________ */
type _cases = [
	Expect<Equal<lastInUnion<1 | 2>, 2>>,
	Expect<Equal<lastInUnion<true>, true>>,
	Expect<Equal<lastInUnion<{ foo: 1 } | { bar: 1 }>, { bar: 1 }>>,
];
