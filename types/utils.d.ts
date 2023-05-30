type _repeatedString<
	S extends string,
	T extends unknown[]
> = T['length'] extends 1 ? S : `${S}${_repeatedString<S, dropFirst<T>>}`;

type _repeatedTuple<
	T,
	N extends number,
	R extends unknown[]
> = R['length'] extends N ? R : _repeatedTuple<T, N, [T, ...R]>;

export namespace Utils {
	export type dropFirst<T extends readonly unknown[]> = T extends readonly [
		any?,
		...infer U
	]
		? U
		: [...T];

	/** global type helper to repeat a type `N` times in a tuple */
	export type repeatedTuple<T, N extends number> = N extends N
		? number extends N
			? T[]
			: _repeatedTuple<T, N, []>
		: never;

	/** global type helper to repeat a string `N` times in a string literal type */
	export type repeatedString<
		S extends string,
		N extends number
	> = _repeatedString<S, repeatedTuple<unknown, N>>;

	export type filteredKeys<T, U> = {
		[P in keyof T]: T[P] extends U ? P : never;
	}[keyof T];

	/** global type helper to create a union array type from a union type */
	export type distributedArray<T> = T extends infer I ? I[] : never;

	/** global type helper to be able to use arrow functions for assertions */
	export type assertFunction<Type> = (value: unknown) => asserts value is Type;

	/** global type helper to prettify complex object types */
	export type prettify<T> = {
		[K in keyof T]: T[K];
	} & {};

	/** takes a string literal as input and returns the union of all the characters */
	export type stringToUnion<T extends string> = T extends `${infer U}${infer V}`
		? U | stringToUnion<V>
		: never;

	/** checks if the two given types are the same */
	export type equal<T, U> = (<G>() => G extends T ? 1 : 2) extends <
		G
	>() => G extends U ? 1 : 2
		? true
		: false;

	/** takes a union of types and converts it into intersection of the types */
	export type unionToIntersection<T> = (
		T extends any ? (x: T) => any : never
	) extends (x: infer U) => any
		? U
		: never;
}
