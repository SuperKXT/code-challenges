const outliers = ['st', 'nd', 'rd'] as const;
export type OrdinalSuffix = typeof outliers[number] | 'th';

export type OrdinalNumber = `${number}${OrdinalSuffix}`;

export const getOrdinalNumber = (
	number: number
): OrdinalNumber => {
	const index = (
		![11, 12, 13].includes(number)
			? (number % 10) - 1
			: -1
	);
	return `${number}${outliers[index] ?? 'th'}`;
};