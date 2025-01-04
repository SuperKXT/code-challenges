import type { Equal, Expect } from "@type-challenges/utils";
import type { Utils } from "../../types/utils.types.js";

/**
 * Type that takes a union and adds missing properties to all branches
 */

type KeysOfUnion<T> = T extends T ? keyof T : never;

type Cover<T, U = T> = Utils.prettify<
	U extends U
		? {
				[K in keyof U]: U[K];
			} & {
				[K in KeysOfUnion<T> as K extends keyof U ? never : K]?: never;
			}
		: never
>;

type _ = Cover<t>;
//   ^?

/* _____________ Test Cases _____________ */
type t = { type: "first"; first: number } | { type: "second"; second: number };
type Covered =
	| { type: "first"; first: number; second?: undefined }
	| { type: "second"; first?: undefined; second: number };

type _cases = [Expect<Equal<Cover<t>, Covered>>];
