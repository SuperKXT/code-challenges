import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const dayjsUtc = dayjs;

export const isDate = (value: any): value is string | Date => {
	if (
		typeof value !== 'string' &&
		typeof value !== 'number' &&
		!(value instanceof Date)
	)
		return false;
	const date = value instanceof Date ? value : new Date(value);
	return !isNaN(date.getTime());
};

export const getDateOrNull = (value: any): null | Date => {
	if (
		typeof value !== 'string' &&
		typeof value !== 'number' &&
		!(value instanceof Date)
	)
		return null;
	const date = value instanceof Date ? value : new Date(value);
	if (isNaN(date.getTime())) return null;
	return date;
};

export const compareDate = (
	first: string | Date,
	second: string | Date,
): number => new Date(first).getTime() - new Date(second).getTime();
