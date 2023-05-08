export const oddSquareNumbers = (input: number) => {
	if (input <= 1) return 0;
	let current = 0;
	for (let i = 1; i * i < input; i += 2) current += i * i;
	return current;
};
