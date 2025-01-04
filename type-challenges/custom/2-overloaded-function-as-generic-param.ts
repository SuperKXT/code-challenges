type OverloadProps<TOverload> = Pick<TOverload, keyof TOverload>;

type OverloadUnionRecursive<
	TOverload,
	TPartialOverload = unknown,
> = TOverload extends (...args: infer TArgs) => infer TReturn
	? // Prevent infinite recursion by stopping recursion when TPartialOverload
		// has accumulated all of the TOverload signatures.
		TPartialOverload extends TOverload
		? never
		:
				| OverloadUnionRecursive<
						TPartialOverload & TOverload,
						TPartialOverload &
							((...args: TArgs) => TReturn) &
							OverloadProps<TOverload>
				  >
				| ((...args: TArgs) => TReturn)
	: never;

type OverloadUnion<TOverload extends (...args: any[]) => unknown> = Exclude<
	OverloadUnionRecursive<
		// The "() => never" signature must be hoisted to the "front" of the
		// intersection, for two reasons: a) because recursion stops when it is
		// encountered, and b) it seems to prevent the collapse of subsequent
		// "compatible" signatures (eg. "() => void" into "(a?: 1) => void"),
		// which gives a direct conversion to a union.
		(() => never) & TOverload
	>,
	TOverload extends () => never ? never : () => never
>;

// Inferring a union of parameter tuples or return types is now possible.
type OverloadParameters<T extends (...args: any[]) => unknown> = Parameters<
	OverloadUnion<T>
>;
type OverloadReturnType<T extends (...args: any[]) => unknown> = ReturnType<
	OverloadUnion<T>
>;

type OverloadParamAndReturnTuple<
	T extends (...args: any[]) => unknown,
	Overloads extends (...args: any[]) => unknown = OverloadUnion<T>,
> = Overloads extends unknown
	? [Parameters<Overloads>, ReturnType<Overloads>]
	: never;

declare function overload(first: number): number;
declare function overload(first: string, second: string): string;

type _params = OverloadParameters<typeof overload>;
//    ^?

type _returns = OverloadReturnType<typeof overload>;
//    ^?

type _tuples = OverloadParamAndReturnTuple<typeof overload>;
//    ^?

const wrap = <
	Fn extends (...args: any[]) => void,
	Args extends OverloadParameters<Fn>,
>(
	fn: Fn,
	...args: Args
) => {
	// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
	return fn(...args) as Extract<
		OverloadParamAndReturnTuple<Fn>,
		[Args, unknown]
	> extends [Args, infer Ret]
		? Ret
		: never;
};

const _res1 = wrap(overload, "foo", "bar");
//     ^?

const _res2 = wrap(overload, 1);
//     ^?
