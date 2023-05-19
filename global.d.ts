import '@total-typescript/ts-reset';

type DropFirst<T extends readonly unknown[]> = T extends readonly [
	any?,
	...infer U
]
	? U
	: [...T];

type _RepeatedString<
	S extends string,
	T extends unknown[]
> = T['length'] extends 1 ? S : `${S}${_RepeatedString<S, DropFirst<T>>}`;

type _RepeatedTuple<
	T,
	N extends number,
	R extends unknown[]
> = R['length'] extends N ? R : _RepeatedTuple<T, N, [T, ...R]>;

declare global {
	/** global type helper to repeat a type `N` times in a tuple */
	type RepeatedTuple<T, N extends number> = N extends N
		? number extends N
			? T[]
			: _RepeatedTuple<T, N, []>
		: never;

	/** global type helper to repeat a string `N` times in a string literal type */
	type RepeatedString<S extends string, N extends number> = _RepeatedString<
		S,
		RepeatedTuple<unknown, N>
	>;

	type FilteredKeys<T, U> = {
		[P in keyof T]: T[P] extends U ? P : never;
	}[keyof T];

	/** global type helper to create a union array type from a union type */
	type DistributedArray<T> = T extends infer I ? I[] : never;

	/** global type alias for a generic object type */
	type Obj = Record<string, unknown>;

	/** global type helper for generic object types containing `_localId`  */
	type WithLocalId<Type extends Obj> = Type & { _localId: _LocalId };

	/** global type helper to be able to use arrow functions for assertions */
	type AssertFunction<Type> = (value: unknown) => asserts value is Type;

	/** global type helper to be able to use arrow functions for array assertions */
	type AssertArrayFunction<Type> = (
		value: unknown,
		onlyCheckFirst?: boolean
	) => asserts value is Type;

	/** global type helper to prettify complex object types */
	type Prettify<T> = {
		[K in keyof T]: T[K];
		// eslint-disable-next-line @typescript-eslint/ban-types
	} & {};

	/** takes a string literal as input and returns the union of all the characters */
	type StringToUnion<T extends string> = T extends `${infer U}${infer V}`
		? U | StringToUnion<V>
		: never;
}
