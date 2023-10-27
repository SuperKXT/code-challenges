import { default as dayjs, isDayjs } from 'dayjs/esm';
import utc from 'dayjs/esm/plugin/utc';
import { z } from 'zod';

import type { Dayjs } from 'dayjs/esm';

dayjs.extend(utc);

export const dayjsUtc = dayjs;

export const dayjsSchema = z.instanceof(
	dayjsUtc as unknown as typeof dayjsUtc.Dayjs,
);

export type ZodDayjs = typeof dayjsSchema;

export const datetimeSchema = z.preprocess((value) => {
	if (isDayjs(value)) return value;
	if (value === undefined || value === null) return null;
	const parsed = dayjsUtc.utc(value as never);
	return parsed.isValid() ? parsed : null;
}, dayjsSchema);

export type ZodDatetime = typeof datetimeSchema;

export type DateLike = string | number | Dayjs | Date;

export const isDate = (value: unknown): value is DateLike => {
	return datetimeSchema.safeParse(value).success;
};

export const getDateOrNull = (value: unknown): null | Date => {
	const parsed = datetimeSchema.safeParse(value);
	if (!parsed.success) return null;
	return parsed.data.toDate();
};

export const compareDate = (first: DateLike, second: DateLike): number => {
	return dayjsUtc.utc(first).diff(second);
};

export const dayjsFormatPatterns = {
	date: 'YYYY-MM-DD',
	time: 'h:mm:ss A',
	datetime: 'YYYY-MM-DD h:mm A',
};

export const dayNames = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
] as const;

export type DateRange = { start: Dayjs; end: Dayjs };

export const hasOverlap = (...ranges: DateRange[]) => {
	for (let i = 0; i < ranges.length; i++) {
		for (let j = 0; j < ranges.length; j++) {
			if (i === j) continue;
			const a = ranges[i] as DateRange;
			const b = ranges[j] as DateRange;
			const overlap = a.end.isAfter(b.start) && a.start.isBefore(b.end);
			if (overlap) return true;
		}
	}
	return false;
};
