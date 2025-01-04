type areDigitsUnique<
	num extends number,
	str extends string = `${num}`,
> = str extends `${infer first}${infer rest}`
	? rest extends `${string}${first}${string}`
		? false
		: areDigitsUnique<never, rest>
	: true;

type tuple<
	size extends number,
	res extends unknown[] = [],
> = res["length"] extends size ? res : tuple<size, [...res, 1]>;

type UniqueSum<arr extends number[], sum extends unknown[] = []> = arr extends [
	infer first extends number,
	...infer rest extends number[],
]
	? UniqueSum<
			rest,
			areDigitsUnique<first> extends true ? [...sum, ...tuple<first>] : sum
		>
	: sum["length"];

export const uniqueSum = <const Arr extends number[]>(
	arr: Arr,
): UniqueSum<Arr> => {
	let sum = 0;
	for (const num of arr) {
		const uniqueDigits = new Set(num.toString().split(""));
		if (uniqueDigits.size !== num.toString().length) continue;
		sum += num;
	}
	return sum as never;
};
