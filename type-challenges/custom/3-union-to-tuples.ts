import type { Equal, Expect } from "@type-challenges/utils";
import type { Utils } from "../../types/utils.types.js";

/**
 * Type that takes a union and converts it to a tuple.
 * DO NOT USE THIS. UNION ORDER IS NOT GUARENTEED.
 */

/** get the last element of a union */
type lastInUnion<T> =
	Utils.unionToIntersection<T extends unknown ? (x: T) => 0 : never> extends (
		x: infer U,
	) => 0
		? U
		: never;

type _last = lastInUnion<1 | 2 | 3>;
//   ^?

/** convert a given union to a tuple of all the elements. order not guaranteed */
type unionToTuple<T, U = lastInUnion<T>> = [U] extends [never]
	? []
	: [...unionToTuple<Exclude<T, U>>, U];

type _ = unionToTuple<t>;
//   ^?

/* _____________ Test Cases _____________ */
type t = 1 | 2 | 3;
type _cases = [Expect<Equal<unionToTuple<t>, [1, 2, 3]>>];
