type reverseTuple<
	T extends readonly unknown[],
	res extends readonly unknown[] = [],
> = T extends readonly [infer first, ...infer rest]
	? reverseTuple<rest, [first, ...res]>
	: res;

type mapReverse<T extends readonly (readonly unknown[])[]> =
	T extends readonly [
		infer first extends readonly unknown[],
		...infer rest extends readonly (readonly unknown[])[],
	]
		? [Readonly<reverseTuple<first>>, ...mapReverse<rest>]
		: [];

type Flip<
	input extends readonly (readonly unknown[])[],
	direction extends 'horizontal' | 'vertical',
> = Readonly<
	direction extends 'vertical' ? reverseTuple<input> : mapReverse<input>
>;

export const flip = <
	const Input extends readonly (readonly unknown[])[],
	Direction extends 'horizontal' | 'vertical',
>(
	input: Input,
	direction: Direction,
): Flip<Input, Direction> => {
	return (
		direction === 'vertical'
			? input.toReversed()
			: input.map((row) => row.toReversed())
	) as never;
};
