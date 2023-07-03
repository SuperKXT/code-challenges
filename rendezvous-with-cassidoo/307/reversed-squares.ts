export const reversedSquare = (num: number): boolean => {
	const reverse = Number(String(num).split('').reverse().join(''));
	return (
		Number.isInteger(Math.sqrt(num)) && Number.isInteger(Math.sqrt(reverse))
	);
};
