export const generateArrays = (
	number: number
): number[][] => {
	return Array.from(
		{ length: number },
		(_, index) => Array.from(
			{ length: index + 1 },
			(_, index) => index + 1
		)
	);
};
