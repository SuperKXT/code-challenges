type TZerosInFactorial<Num extends number> = number;

export const zerosInFactorial = <const Num extends number>(
	num: Num,
): TZerosInFactorial<Num> => {
	let factorial = 1n;
	for (let i = BigInt(num); i > 0; i--) {
		factorial *= i;
	}
	const regex = /0+$/u;
	const zeros = String(factorial).match(regex)?.[0].length ?? 0;
	return zeros as never;
};
