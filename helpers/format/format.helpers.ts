export const NUMBER_PERIODS = [
	'',
	'thousand',
	'million',
	'billion',
	'trillion',
	'quadrillion',
	'quintillion',
	'sextillion',
] as const;

export const NUMBER_TENS = [
	'',
	'',
	'twenty',
	'thirty',
	'forty',
	'fifty',
	'sixty',
	'seventy',
	'eighty',
	'ninety',
] as const;

export const NUMBER_UNITS = [
	'',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
	'eleven',
	'twelve',
	'thirteen',
	'fourteen',
	'fifteen',
	'sixteen',
	'seventeen',
	'eighteen',
	'nineteen',
] as const;

export const numberToWords = (number: number): string => {
	if (isNaN(number)) throw new Error('invalid number!');
	if (number === 0) return 'zero';
	const string = Math.abs(number).toString();

	const groups = Array.from(
		{ length: Math.ceil(string.length / 3) },
		(_, index) => {
			const start = (index + 1) * -3;
			const end = start + 3 || undefined;
			return string.slice(start, end);
		}
	);
	const groupWords = groups.map((group, index) => {
		const postFix = NUMBER_PERIODS[index];
		const digits = group.padStart(3, '0');
		const hundreds = NUMBER_UNITS[Number(digits[0])];
		const pieces = new Array<string | undefined>();
		pieces.push(hundreds);
		if (hundreds) pieces.push('hundred');
		const unit = NUMBER_UNITS[Number(digits.slice(1))];
		if (unit) {
			pieces.push(unit);
		} else {
			const tens = NUMBER_TENS[Number(digits[1])];
			const units = NUMBER_UNITS[Number(digits[2])];
			pieces.push(tens);
			pieces.push(units);
		}
		pieces.push(postFix);
		return pieces.filter(Boolean).join(' ');
	});
	return (
		(number < 0 ? 'minus ' : '') +
		groupWords.reverse().filter(Boolean).join(', ')
	);
};
