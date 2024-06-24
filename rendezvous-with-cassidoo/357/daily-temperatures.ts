export const dailyTemperatures = (input: number[]): number[] => {
	return input.map((num, idx) =>
		Math.max(
			input.slice(idx).findIndex((n) => n > num),
			0,
		),
	);
};
