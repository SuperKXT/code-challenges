export const excludeString = <const T extends string, const U extends T>(
	input: T,
	...excludeList: U[]
): Exclude<T, U> | undefined => {
	return (excludeList.includes(input as U) ? undefined : input) as never;
};
