type Input =
	| 'camelCaseString'
	| 'CONSTANT_CASE_STRING'
	| 'kebab-case-string'
	| 'lower'
	| 'PascalCaseString'
	| 'snake_case_string'
	| 'UPPER';

export type Camel<T extends string> = T extends
	| `${infer First}_${infer Second}`
	| `${infer First}-${infer Second}`
	? `${Lowercase<First>}${Capitalize<Camel<Second>>}`
	: T extends Uppercase<T>
	? Lowercase<T>
	: Uncapitalize<T>;

export type Pascal<T extends string> = T extends
	| `${infer First}_${infer Second}`
	| `${infer First}-${infer Second}`
	? `${Capitalize<First>}${Capitalize<Pascal<Second>>}`
	: T;

export type Snake<T extends string> = T extends
	| `${infer First}_${infer Second}`
	| `${infer First}-${infer Second}`
	? `${Lowercase<First>}_${Lowercase<Snake<Second>>}`
	: Lowercase<T>;

export type Kebab<T extends string> = T extends
	| `${infer First}_${infer Second}`
	| `${infer First}-${infer Second}`
	? `${Lowercase<First>}-${Lowercase<Snake<Second>>}`
	: Lowercase<T>;

export type Constant<T extends string> =
	T extends `${infer First}-${infer Second}`
		? `${Uppercase<First>}_${Uppercase<Constant<Second>>}`
		: T extends Uppercase<T>
		? Lowercase<T>
		: Capitalize<T>;

/* eslint-disable unused-imports/no-unused-vars */

// @ts-expect-error something
type A = Camel<Input>;
//   ^?

// @ts-expect-error something
type D = Pascal<Input>;
//   ^?

// @ts-expect-error something
type B = Snake<Input>;
//   ^?

// @ts-expect-error something
type C = Kebab<Input>;
//   ^?

// @ts-expect-error something
type E = Constant<Input>;
//   ^?
