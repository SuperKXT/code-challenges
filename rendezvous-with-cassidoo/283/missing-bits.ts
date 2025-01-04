export const missingBits = (range: number[]): string => {
	const filledRange = range.reduce((array: string[], number, index) => {
		const last = range[index - 1];
		if (last === number - 2) array.push((number - 1).toString());
		else if ((last ?? Infinity) < number - 2) array.push("...");

		array.push(number.toString());
		return array;
	}, []);
	return `[${filledRange.join(",")}]`;
};
