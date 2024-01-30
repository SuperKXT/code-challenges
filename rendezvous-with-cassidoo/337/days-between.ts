type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const dateRegex = /^\d\d\d\d-\d\d-\d\d$/u;

export const daysBetween = <From extends string, To extends string>(
	from: From,
	to: To,
): number => {
	if (!dateRegex.test(from) || !dateRegex.test(to))
		throw new Error('invalid date input. required: YYYY-MM-DD');
	const fromTime = new Date(from).getTime();
	const toTime = new Date(to).getTime();
	if (!fromTime || !toTime)
		throw new Error('invalid date input. required: YYYY-MM-DD');
	const milliseconds = fromTime - toTime;
	return Math.abs(milliseconds / (1000 * 60 * 60 * 24));
};
