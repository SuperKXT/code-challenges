export type LexoNext<num extends number> = number;

export const lexoNext = <Num extends number>(num: Num): LexoNext<Num> => {
	const digitArray = num.toString().split('');
	for (let i = digitArray.length - 1; i > 0; i--) {
		const char = parseInt(digitArray[i] as string);
		const last = parseInt(digitArray[i - 1] as string);
		if (char > last) {
			digitArray[i] = last.toString();
			digitArray[i - 1] = char.toString();
			break;
		}
	}
	return Number(digitArray.join('')) as never;
};
