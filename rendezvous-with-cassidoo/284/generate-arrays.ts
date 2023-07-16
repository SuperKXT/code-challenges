export const generateArrays = (number: number): number[][] => {
	return Array.from({ length: number }, (_1, index) =>
		Array.from({ length: index + 1 }, (_2, innerIndex) => innerIndex + 1),
	);
};
