type Flip<
	input extends Readonly<Readonly<unknown[]>[]>,
	direction extends 'horizontal' | 'vertical',
> = unknown[][];

export const flip = <
	const Input extends Readonly<Readonly<unknown[]>[]>,
	Direction extends 'horizontal' | 'vertical',
>(
	input: Input,
	direction: Direction,
): Flip<Input, Direction> => {
	const result = input.map((row) => row.slice()) as unknown as unknown[][];

	const nestedSizes = [...new Set(input.map((row) => row.length))];
	if (nestedSizes.length !== 1)
		throw new Error('all nested arrays must be equal size');

	const nestedSize = nestedSizes[0] as number;

	if (direction === 'vertical') {
		for (let idx = 0; idx < input.length / 2; idx++) {
			result[idx] = input.at(-1 - idx) as unknown[];
			result[input.length - 1 - idx] = input.at(idx) as unknown[];
		}
	} else if (direction === 'horizontal') {
		for (let idx = 0; idx < nestedSize / 2; idx++) {
			for (let rowIdx = 0; rowIdx < input.length; rowIdx++) {
				const row = input[rowIdx] as unknown[];
				const resultRow = result[rowIdx] as unknown[];
				resultRow[idx] = row.at(-1 - idx);
				resultRow[input.length - 1 - idx] = row.at(idx);
			}
		}
	}
	return result as never;
};
