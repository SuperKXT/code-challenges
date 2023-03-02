import '@total-typescript/ts-reset';

type _RepeatedTuple<
	T,
	N extends number,
	R extends unknown[]
> = R['length'] extends N ? R : _RepeatedTuple<T, N, [T, ...R]>;

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
	type ReadableTypeOf =
		| 'undefined'
		| 'boolean'
		| 'number'
		| 'bigint'
		| 'string'
		| 'symbol'
		| 'function'
		| 'array'
		| 'null'
		| 'object';

	type RepeatedTuple<T, N extends number> = N extends N
		? number extends N
			? T[]
			: _RepeatedTuple<T, N, []>
		: never;

	type DistributedArray<T> = T extends infer I ? I[] : never;

	type RepeatedString<S extends string, N extends number> = _RepeatedString<
		S,
		RepeatedTuple<unknown, N>
	>;

	interface ComponentWithChildren {
		children: ReactNode;
	}

	type AssertFunction<Type> = (value: any) => asserts value is Type;

	type AssertArrayFunction<Type> = (
		value: any,
		onlyCheckFirst?: boolean
	) => asserts value is Type;
}

export {};
