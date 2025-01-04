import type { Equal, Expect } from "@type-challenges/utils";

type ParseNum<T> = T extends number
	? T
	: T extends `${infer num extends number}`
		? num
		: never;

type ParsePositiveInt<T> = T extends T
	? ParseNum<T> extends infer num extends number
		? `${num}` extends `-${number}` | `${number}.${number}`
			? never
			: num
		: never
	: never;

type IsObjArrayable<T, K = keyof T> = (
	K extends K ? ([ParsePositiveInt<K>] extends [never] ? false : true) : false
) extends true
	? true
	: false;

type ObjToArray<
	T,
	keys extends number = ParsePositiveInt<keyof T>,
	res extends unknown[] = [],
> = [keys] extends [never]
	? res
	: ObjToArray<
			T,
			Exclude<keys, res["length"]>,
			[
				...res,
				res["length"] extends keys
					? res["length"] extends keyof T
						? T[res["length"]]
						: `${res["length"]}` extends keyof T
							? T[`${res["length"]}`]
							: undefined
					: undefined,
			]
		>;

type TryObjToArray<T> = IsObjArrayable<T> extends true ? ObjToArray<T> : never;

type _ = TryObjToArray<{ 0: "foo"; "1": "bar" }>;
//   ^?

type _cases = [
	Expect<Equal<TryObjToArray<{ 0: "foo"; "1": "bar" }>, ["foo", "bar"]>>,
	Expect<Equal<TryObjToArray<{ 0: "foo"; "-1": "bar" }>, never>>,
	Expect<Equal<TryObjToArray<{ 0: "foo"; "1.25": "bar" }>, never>>,
	Expect<
		Equal<
			TryObjToArray<{ 0: "foo"; "3": "bar" }>,
			["foo", undefined, undefined, "bar"]
		>
	>,
	Expect<Equal<TryObjToArray<{ "1": "bar" }>, [undefined, "bar"]>>,
];
