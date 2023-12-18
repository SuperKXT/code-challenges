type tuple<
	size extends number,
	res extends 1[] = [],
> = res['length'] extends size ? res : tuple<size, [...res, 1]>;

export const isBitonic = <const Input extends number[]>(
	input: Input,
): false | number => {
	let peak: number | undefined = undefined;
	for (let i = 0; i < input.length; i++) {
		const curr = input[i] as number;
		const next = input[i + 1] as number;
		if (curr > next && i === 0) return false;
		if (!peak && curr > next) peak = curr;
		else if (peak && curr < next) return false;
	}
	if (!peak) return false as never;
	return peak as never;
};
