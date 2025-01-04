const dateRegex = /^\d{4}-\d{2}-\d{2}$/u;

export const daysBetween = (from: string, to: string): number => {
	if (!dateRegex.test(from) || !dateRegex.test(to))
		throw new Error("invalid date input. required: YYYY-MM-DD");
	const fromTime = new Date(from).getTime();
	const toTime = new Date(to).getTime();
	if (!fromTime || !toTime)
		throw new Error("invalid date input. required: YYYY-MM-DD");
	const milliseconds = fromTime - toTime;
	return Math.abs(milliseconds / (1000 * 60 * 60 * 24));
};
