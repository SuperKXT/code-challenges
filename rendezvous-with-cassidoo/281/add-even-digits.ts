export const addEventDigits = (number: number): number => {
	return Array.from(number.toString())
		.filter((digit) => !isNaN(Number(digit)))
		.filter((_, index) => index % 2)
		.reduce((sum, digit) => sum + Number(digit), 0);
};

export const addEventDigitsSinglePass = (number: number): number => {
	let skipped = false;
	let sum = 0;
	for (const digit of Array.from(number.toString())) {
		const parsed = Number(digit);
		if (isNaN(parsed)) continue;

		if (!skipped) {
			skipped = true;
			continue;
		}
		sum += parsed;
		skipped = false;
	}
	return sum;
};
