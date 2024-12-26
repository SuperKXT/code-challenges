export const zerosInFactorial = <const Num extends number>(
	num: Num,
): number => {
	let result = 0;
	// ? https://www.purplemath.com/modules/factzero.htm
	let power = 5;
	while (power <= num) {
		result += Math.floor(num / power);
		power *= 5;
	}
	return result as never;
};
