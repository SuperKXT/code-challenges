export const fromTo = (
	min: number,
	max: number,
): (() => number | undefined) => {
	let current = min;
	return () => (current <= max ? current++ : undefined);
};
