/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable no-multi-assign */
/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/*
  697 - Tag
  -------
  by null (@uid11) #extreme

  ### Question

  Despite the structural typing system in TypeScript, it is sometimes convenient to mark some types with tags, and so that these tags do not interfere with the ability to assign values  of these types to each other.

  For example, using tags, you can check that some value passes through the calls of the required functions, and in the correct order:
  ```ts
  const doA = <T extends string>(x: T) => {
    const result = x

    return result as Tag<typeof result, 'A'>
  }

  const doB = <T extends string>(x: T) => {
    const result = x

    return result as Tag<typeof result, 'B'>
  };

  const a = doA('foo')
  const b = doB(a)

  type Check0 = IsTrue<HasTags<typeof b, ['A', 'B']>>
  ```

  Write a function `Tag<B, T extends string>` that takes a type `B` other than `null` and `undefined` and returns a type labeled with the string literal type `T`.

  The labeled types must be mutually assignable with the corresponding original types:
  ```ts
  declare let x: string
  declare let y: Tag<string, 'A'>

  x = y = x
  ```

  When tagging a type already marked with a tag, a new tag must be added to the end of the list of all tags of the type:
  ```ts
  type T0 = Tag<{ foo: string }, 'A'>
  type T1 = Tag<T0, 'B'>

  type Check1 = IsTrue<HasExactTags<T1, ['A', 'B']>>
  ```

  Add some functions to check for type tags.

  `GetTags<B>` retrieves a list of all tags of a type `B`:
  ```ts
  type T2 = Tag<number, 'C'>

  type Check2 = IsTrue<Equal<GetTags<T2>, ['C']>>
  ```

  `HasTag<B, T extends string>` checks if type `B` is tagged with tag `T` (and returns `true` or `false`):
  ```ts
  type T3 = Tag<0 | 1, 'D'>

  type Check3 = IsTrue<HasTag<T3, 'D'>>
  ```

  `HasTags<B, T extends readonly string[]>` checks if type `B` is tagged in succession with tags from tuple `T`:
  ```ts
  type T4 = Tag<Tag<Tag<{}, 'A'>, 'B'>, 'C'>

  type Check4 = IsTrue<HasTags<T4, ['B', 'C']>>
  ```

  `HasExactTags<B, T extends readonly string[]>` checks if the list of all tags of type `B` is exactly equal to the `T` tuple:
  ```ts
  type T5 = Tag<Tag<unknown, 'A'>, 'B'>

  type Check5 = IsTrue<HasExactTags<T5, ['A', 'B']>>
  ```

  Finally, add type `UnTag<B>`, which removes all tags from type `B`:
  ```ts
  type T6 = Tag<{ bar: number }, 'A'>
  type T7 = UnTag<T6>

  type Check6 = IsFalse<HasTag<T7, 'A'>>
  ```

  > View on GitHub: https://tsch.js.org/697
*/

/* _____________ Your Code Here _____________ */

declare const KEY: unique symbol;

type Tuple = readonly string[];

interface Tagged {
	readonly [KEY]?: unknown;
}

/**
 * Shift<["foo", "bar", "baz"]> = ["bar", "baz"].
 */
type Shift<T extends Tuple> = T extends [infer Head, ...infer Tail] ? Tail : [];

/**
 * StartWith<[], ["foo"]> = true.
 * StartWith<["foo"], ["foo", "bar"]> = true.
 * StartWith<["foo", "baz"], ["foo", "bar"]> = false.
 * StartWith<["foo", "bar"], ["foo", "bar", "qux"]> = true.
 */
type StartWith<S extends Tuple, T extends Tuple> = S extends []
	? true
	: Equal<S[0], T[0]> extends false
	? false
	: StartWith<Shift<S>, Shift<T>>;

/**
 * Includes<["foo", "bar"], ["quux", "foo", "bar", "qux"]> = true.
 * Includes<["foo"], ["bar", "qux"]> = false.
 */
type Includes<S extends Tuple, T extends Tuple> = S extends []
	? true
	: T extends []
	? false
	: Equal<S[0], T[0]> extends true
	? StartWith<S, T>
	: Includes<S, Shift<T>>;

/**
 * GetStringProps<{ 0: 0; x?: 3 }> = 3.
 */
type GetStringProps<T> = Exclude<
	{
		[K in keyof T & string]: T[K];
	}[keyof T & string],
	undefined
>;

/**
 * GetStringKeys<{ 0: 0; x?: 3 }> = "x".
 */
type GetStringKeys<T> = Exclude<
	{
		[K in keyof T & string]: K;
	}[keyof T & string],
	undefined
>;

/**
 * GetTagsKey<null> = "".
 * GetTagsKey<Tag<string, "foo">> = "0foo".
 * GetTagsKey<Tag<Tag<string, "foo">, "bar">> = "0foo1bar"
 */
type GetTagsKey<
	V,
	TagsOrUndefined = [V] extends [Tagged] ? V[typeof KEY] : undefined,
	TagsKeyOrNever = GetStringKeys<Exclude<TagsOrUndefined, undefined>>,
> = Equal<TagsKeyOrNever, never> extends true
	? ''
	: Equal<TagsKeyOrNever, string> extends true
	? ''
	: TagsKeyOrNever;

/**
 * GetTags<null> = [].
 * GetTags<any> = [].
 * GetTags<Tag<string, "foo">> = ["foo"].
 * GetTags<Tag<Tag<string, "foo">, "bar">> = ["foo", "bar"].
 * GetTags<Tag<Tag<Tag<{}, "foo">, "bar">, "baz">> = ["foo", "bar", "baz"].
 */
export type GetTags<
	V,
	TagsOrUndefined = [V] extends [Tagged] ? V[typeof KEY] : undefined,
	TagsOrNever = GetStringProps<Exclude<TagsOrUndefined, undefined>>,
> = Equal<V, unknown> extends true
	? []
	: Equal<TagsOrNever, never> extends true
	? []
	: TagsOrNever extends Tuple
	? TagsOrNever
	: [];

/**
 * Tag<number, "foo"> = number with tag "foo".
 * Tag<{ x: 0 }, "foo"> = { x: 0 } with tag "foo".
 * Tag<Tag<V, "foo">, "bar"> = V with tags "foo" and "bar".
 */
export type Tag<
	V,
	T extends string,
	Tags extends Tuple = GetTags<V>,
	TagsKey extends string = GetTagsKey<V>,
> = Equal<V, null> extends true
	? null
	: Equal<V, undefined> extends true
	? undefined
	: (typeof KEY extends keyof V ? Omit<V, typeof KEY> : V) & {
			readonly [KEY]?: { 0: 0 } & {
				[K in `${TagsKey}${Tags['length']}${T}`]?: [...Tags, T];
			};
	  };

/**
 * UnTag<null> = null.
 * UnTag<undefined> = undefined.
 * UnTag<Tag<{}, "foo">> = {}.
 * UnTag<Tag<Tag<{ x: 0 }, "foo">, "bar">> = { x: 0 }.
 */
export type UnTag<V> = typeof KEY extends keyof V ? Omit<V, typeof KEY> : V;

/**
 * HasTag<null, "foo"> = false.
 * HasTag<Tag<{}, "foo">, "foo"> = true.
 * HasTag<Tag<any, "foo">, "foo"> = true.
 * HasTag<Tag<Tag<{}, "foo">, "bar">, "foo"> = true.
 * HasTag<Tag<Tag<symbol, "bar">, "foo">, "foo"> = true.
 * HasTag<Tag<Tag<{}, "bar">, "baz">, "foo"> = false.
 */
export type HasTag<V, T extends string> = Includes<[T], GetTags<V>>;

/**
 * HasTags<null, ["foo"]> = false.
 * HasTags<Tag<{}, "bar">, ["foo"]> = false.
 * HasTags<Tag<any, "bar">, ["foo"]> = false.
 * HasTags<Tag<{}, "foo">, ["foo"]> = true.
 * HasTags<Tag<any, "foo">, ["foo"]> = true.
 * HasTags<Tag<Tag<string, "foo">, "bar">, ["foo", "bar"]> = true.
 * HasTags<Tag<Tag<{}, "bar">, "foo">, ["foo", "bar"]> = false.
 * HasTags<Tag<Tag<Tag<{}, "baz">, "foo">, "bar">, ["foo", "bar"]> = true.
 * HasTags<Tag<Tag<Tag<{}, "foo">, "bar">, "baz">, ["foo", "bar"]> = true.
 * HasTags<Tag<Tag<Tag<{}, "foo">, "baz">, "bar">, ["foo", "bar"]> = false.
 */
export type HasTags<V, T extends Tuple> = Includes<T, GetTags<V>>;

/**
 * HasExactTags<0, []> = true.
 * HasExactTags<Tag<number, "foo">, ["foo"]> = true.
 * HasExactTags<Tag<{}, "foo">, ["bar"]> = false.
 * HasExactTags<Tag<Tag<any, "foo">, "bar">, ["foo", "bar"]> = true.
 * HasExactTags<Tag<Tag<Tag<{}, "foo">, "bar">, "baz">, ["foo", "bar"]> = false.
 * HasExactTags<Tag<Tag<Tag<{}, "foo">, "bar">, "baz">, ["foo", "bar", "baz"]> = true.
 */
export type HasExactTags<V, T extends Tuple> = Equal<GetTags<V>, T>;

// todo RETRY

/* _____________ Test Cases _____________ */
import type { Equal, Expect, IsTrue } from '@type-challenges/utils';

/**
 * Tests of assignable of tagged variables.
 */
interface I {
	foo: string;
}

declare let x0: I;
declare let x1: Tag<I, 'a'>;
declare let x2: Tag<I, 'b'>;
declare let x3: Tag<Tag<I, 'a'>, 'b'>;
declare let x4: Tag<Tag<I, 'b'>, 'a'>;
declare let x5: Tag<Tag<I, 'c'>, 'a'>;
declare let x6: Tag<Tag<I, 'c'>, 'b'>;
declare let x7: UnTag<Tag<Tag<I, 'c'>, 'b'>>;
type _ = GetTags<typeof x6>;
//   ^?

x0 = x1 = x0 = x2 = x0 = x3 = x0 = x4 = x0 = x5 = x0 = x6 = x0 = x7 = x0;
x1 = x2 = x1 = x3 = x1 = x4 = x1 = x5 = x1 = x6 = x1 = x7 = x1;
x2 = x3 = x2 = x4 = x2 = x5 = x2 = x6 = x2 = x7 = x2;
x3 = x4 = x3 = x5 = x3 = x6 = x3 = x7 = x3;
x4 = x5 = x4 = x6 = x4 = x7 = x4;
x5 = x6 = x5 = x7 = x5;
x6 = x7 = x6;

declare let y0: string;
declare let y1: Tag<string, 'a'>;
declare let y2: Tag<string, 'b'>;
declare let y3: Tag<Tag<string, 'a'>, 'b'>;
declare let y4: Tag<Tag<string, 'b'>, 'a'>;
declare let y5: Tag<Tag<string, 'c'>, 'a'>;
declare let y6: Tag<Tag<string, 'c'>, 'b'>;
declare let y7: UnTag<Tag<Tag<string, 'c'>, 'b'>>;

y0 = y1 = y0 = y2 = y0 = y3 = y0 = y4 = y0 = y5 = y0 = y6 = y0 = y7 = y0;
y1 = y2 = y1 = y3 = y1 = y4 = y1 = y5 = y1 = y6 = y1 = y7 = y1;
y2 = y3 = y2 = y4 = y2 = y5 = y2 = y6 = y2 = y7 = y2;
y3 = y4 = y3 = y5 = y3 = y6 = y3 = y7 = y3;
y4 = y5 = y4 = y6 = y4 = y7 = y4;
y5 = y6 = y5 = y7 = y5;
y6 = y7 = y6;

// @ts-expect-error
x0 = y0;
// @ts-expect-error
x1 = y1;
// @ts-expect-error
x2 = y2;
// @ts-expect-error
x3 = y3;
// @ts-expect-error
x4 = y4;
// @ts-expect-error
x5 = y5;
// @ts-expect-error
x6 = y6;
// @ts-expect-error
x7 = y7;

declare const UNIQUE_SYMBOL: unique symbol;
type US = typeof UNIQUE_SYMBOL;

/**
 * Tests of API (Tag, GetTags, Untag, HasTag, HasTags, HasExactTags).
 */
type _cases = [
	/**
	 * Tag.
	 */
	IsTrue<Equal<Tag<null, 'foo'>, null>>,
	IsTrue<Equal<Tag<undefined, 'foo'>, undefined>>,
	IsTrue<Equal<'x', keyof Tag<{ x: 0 }, 'foo'> & string>>,

	/**
	 * GetTags.
	 */
	IsTrue<Equal<GetTags<null>, []>>,
	IsTrue<Equal<GetTags<unknown>, []>>,
	IsTrue<Equal<GetTags<undefined>, []>>,
	IsTrue<Equal<GetTags<Tag<unknown, 'foo'>>, ['foo']>>,
	IsTrue<Equal<GetTags<Tag<null | 1, 'foo'>>, ['foo']>>,
	IsTrue<Equal<GetTags<Tag<0, 'foo'> | 1>, []>>,
	IsTrue<Equal<GetTags<Tag<{}, 'foo'> | Tag<1, 'foo'>>, ['foo']>>,
	IsTrue<Equal<GetTags<Tag<string, 'foo'>>, ['foo']>>,
	IsTrue<Equal<GetTags<Tag<never, 'foo'>>, ['foo']>>,
	IsTrue<Equal<GetTags<Tag<Tag<string, 'foo'>, 'bar'>>, ['foo', 'bar']>>,
	IsTrue<
		Equal<
			GetTags<Tag<Tag<Tag<{}, 'foo'>, 'bar'>, 'baz'>>,
			['foo', 'bar', 'baz']
		>
	>,

	/**
	 * UnTag.
	 */
	IsTrue<Equal<UnTag<null>, null>>,
	IsTrue<Equal<UnTag<undefined>, undefined>>,
	IsTrue<Equal<UnTag<Tag<{}, 'foo'>>, {}>>,
	IsTrue<Equal<UnTag<Tag<Tag<{ x: 0 }, 'foo'>, 'bar'>>, { x: 0 }>>,
	IsTrue<Equal<keyof UnTag<Tag<Tag<number, 'foo'>, 'bar'>>, keyof number>>,

	/**
	 * HasTag.
	 */
	Expect<Equal<HasTag<null, 'foo'>, false>>,
	Expect<Equal<HasTag<undefined, 'foo'>, false>>,
	Expect<Equal<HasTag<Tag<unknown, 'foo'>, 'foo'>, true>>,
	Expect<Equal<HasTag<Tag<1, 'foo'> | {}, 'foo'>, false>>,
	Expect<Equal<HasTag<Tag<{}, 'foo'>, 'foo'>, true>>,
	Expect<Equal<HasTag<Tag<0, 'foo'> | Tag<1, 'foo'>, 'foo'>, true>>,
	Expect<Equal<HasTag<Tag<0, 'foo'> | Tag<1, 'bar'>, 'foo'>, false>>,
	Expect<Equal<HasTag<Tag<Tag<{}, 'foo'>, 'bar'>, 'foo'>, true>>,
	Expect<Equal<HasTag<Tag<Tag<symbol, 'bar'>, 'foo'>, 'foo'>, true>>,
	Expect<Equal<HasTag<Tag<Tag<{}, 'bar'>, 'baz'>, 'foo'>, false>>,
	Expect<Equal<HasTag<Tag<true, 'foo'>, 'foo'>, true>>,
	Expect<Equal<HasTag<Tag<null, 'foo'>, 'foo'>, false>>,
	Expect<Equal<HasTag<Tag<Tag<undefined, 'foo'>, 'bar'>, 'bar'>, false>>,
	Expect<Equal<HasTag<Tag<Tag<false, 'foo'>, 'bar'>, 'foo'>, true>>,
	Expect<Equal<HasTag<Tag<Tag<never, 'bar'>, 'foo'>, 'foo'>, true>>,
	Expect<Equal<HasTag<Tag<{}, 'foo'>, 'foo'>, true>>,
	Expect<Equal<HasTag<Tag<{}, 'foo'>, 'bar'>, false>>,
	Expect<Equal<HasTag<{}, 'foo'>, false>>,

	/**
	 * HasTags.
	 */
	Expect<Equal<HasTags<null, ['foo']>, false>>,
	Expect<Equal<HasTags<undefined, ['foo']>, false>>,
	Expect<Equal<HasTags<Tag<unknown, 'bar'>, ['foo']>, false>>,
	Expect<Equal<HasTags<Tag<{}, 'bar'>, ['foo']>, false>>,
	Expect<Equal<HasTags<Tag<{}, 'foo'>, ['foo']>, true>>,
	Expect<Equal<HasTags<Tag<unknown, 'foo'>, ['foo']>, true>>,
	Expect<Equal<HasTags<Tag<{} | undefined, 'foo'>, ['foo']>, true>>,
	Expect<Equal<HasTags<Tag<Tag<string, 'foo'>, 'bar'>, ['foo', 'bar']>, true>>,
	Expect<Equal<HasTags<Tag<Tag<3n, 'foo'>, 'bar'>, ['foo', 'bar']>, true>>,
	Expect<Equal<HasTags<Tag<Tag<{}, 'bar'>, 'foo'>, ['foo', 'bar']>, false>>,
	Expect<
		Equal<HasTags<Tag<Tag<Tag<{}, 'baz'>, 'foo'>, 'bar'>, ['foo', 'bar']>, true>
	>,
	Expect<
		Equal<
			HasTags<Tag<Tag<Tag<symbol, 'baz'>, 'foo'>, 'bar'>, ['foo', 'bar']>,
			true
		>
	>,
	Expect<
		Equal<HasTags<Tag<Tag<Tag<{}, 'foo'>, 'bar'>, 'baz'>, ['foo', 'bar']>, true>
	>,
	Expect<
		Equal<HasTags<Tag<Tag<Tag<0, 'foo'>, 'bar'>, 'baz'>, ['foo', 'bar']>, true>
	>,
	Expect<
		Equal<
			HasTags<Tag<Tag<Tag<{}, 'foo'>, 'baz'>, 'bar'>, ['foo', 'bar']>,
			false
		>
	>,
	Expect<Equal<HasTags<Tag<Tag<unknown, 'foo'>, 'bar'>, ['foo', 'bar']>, true>>,

	/**
	 * HasExactTags.
	 */
	Expect<Equal<HasExactTags<0, []>, true>>,
	Expect<Equal<HasExactTags<null, []>, true>>,
	Expect<Equal<HasExactTags<undefined, []>, true>>,
	Expect<Equal<HasExactTags<Tag<number, 'foo'>, ['foo']>, true>>,
	Expect<Equal<HasExactTags<Tag<unknown, 'foo'>, ['bar']>, false>>,
	Expect<
		Equal<HasExactTags<Tag<Tag<unknown, 'foo'>, 'bar'>, ['foo', 'bar']>, true>
	>,
	Expect<Equal<HasExactTags<Tag<'', 'foo'>, ['foo']>, true>>,
	Expect<Equal<HasExactTags<Tag<US, 'foo'>, ['foo']>, true>>,
	Expect<Equal<HasExactTags<Tag<{}, 'foo'>, ['bar']>, false>>,
	Expect<
		Equal<
			HasExactTags<Tag<Tag<Tag<{}, 'foo'>, 'bar'>, 'baz'>, ['foo', 'bar']>,
			false
		>
	>,
	Expect<
		Equal<
			HasExactTags<
				Tag<Tag<Tag<{}, 'foo'>, 'bar'>, 'baz'>,
				['foo', 'bar', 'baz']
			>,
			true
		>
	>,
	Expect<
		Equal<HasExactTags<Tag<Tag<void, 'foo'>, 'bar'>, ['foo', 'bar']>, true>
	>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/697/answer
  > View solutions: https://tsch.js.org/697/solutions
  > More Challenges: https://tsch.js.org
*/
