const outliers = ['st', 'nd', 'rd'] as const;
export type OrdinalSuffix = typeof outliers[number] | 'th';

export type OrdinalNumber = `${number}${OrdinalSuffix}`;

export const getOrdinalNumber = (
	number: number
): OrdinalNumber => {
	const remainder = number % 10;
	return `${number}${outliers[remainder - 1] ?? 'th'}`;
};