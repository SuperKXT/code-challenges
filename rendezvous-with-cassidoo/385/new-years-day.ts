const dayMap = {
	1: "Monday",
	2: "Tuesday",
	3: "Wednesday",
	4: "Thursday",
	5: "Friday",
	6: "Saturday",
	0: "Sunday",
} as const;

type TDay = (typeof dayMap)[keyof typeof dayMap];

export const newYearsDay = (year: number): TDay => {
	const day = new Date(year, 0, 1).getDay();
	return dayMap[day as keyof typeof dayMap] as TDay;
};
