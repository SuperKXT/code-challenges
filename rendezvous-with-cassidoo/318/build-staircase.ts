type BuildStaircase<
	T extends number,
	idx extends 1[] = [1],
	sum extends 1[] = [1],
> = sum[T] extends 1
	? idx extends [unknown, ...infer rest]
		? rest["length"]
		: 0
	: BuildStaircase<T, [...idx, 1], [...sum, ...idx, 1]>;

export const buildStaircase = <T extends number>(
	input: T,
): BuildStaircase<T> => {
	let sum = 1;
	let idx = 1;
	while (sum <= input) sum += ++idx;
	return (idx - 1) as never;
};
