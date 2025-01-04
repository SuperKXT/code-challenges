const monthMap = {
	0: "Jan",
	1: "Feb",
	2: "Mar",
	3: "Apr",
	4: "May",
	5: "Jun",
	6: "Jul",
	7: "Aug",
	8: "Sep",
	9: "Oct",
	10: "Nov",
	11: "Dec",
} as const;

export const returnGift = (input: string): string => {
	const date = new Date(input);
	if (isNaN(date.getTime())) throw new Error("Invalid date");
	date.setDate(date.getDate() + (date.getMonth() === 11 ? 90 : 30) - 1);
	return `${
		monthMap[date.getMonth() as keyof typeof monthMap]
	} ${date.getDate()}, ${date.getFullYear()}`;
};
