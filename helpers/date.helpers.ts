import { default as dayjs } from 'dayjs/esm';
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
	if (dayjsUtc.isDayjs(value)) return value;
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

export class DateRange<
	Start extends string,
	End extends string,
	Range extends { [k in Start]: Dayjs } & { [k in End]: Dayjs },
> {
	private EOD = 1440;

	constructor(
		private start: Start,
		private end: End,
		private includeEdgesInOverlap: boolean = false,
	) {}

	hasRange<T extends Obj>(
		input: T,
	): input is {
		[k in keyof T]: k extends Start | End ? T[k] & Dayjs : T[k];
	} {
		const start = input[this.start];
		const end = input[this.end];
		return (
			dayjsUtc.isDayjs(start) &&
			start.isValid() &&
			dayjsUtc.isDayjs(end) &&
			end.isValid()
		);
	}

	hasRangeArray<T extends Obj>(
		input: T[],
	): input is {
		[k in keyof T]: k extends Start | End ? T[k] & Dayjs : T[k];
	}[] {
		return input.every((row) => this.hasRange(row));
	}

	hasDateRangeOverlap(...ranges: Range[]) {
		for (let i = 0; i < ranges.length; i++) {
			for (let j = 0; j < ranges.length; j++) {
				if (i === j) continue;
				const a = ranges[i] as Range;
				const b = ranges[j] as Range;
				const overlap = this.includeEdgesInOverlap
					? !a[this.end].isBefore(b[this.end]) &&
					  !a[this.start].isAfter(b[this.end])
					: a[this.end].isAfter(b[this.start]) &&
					  a[this.start].isBefore(b[this.end]);
				if (overlap) return true;
			}
		}
		return false;
	}

	createMinuteArray(range: Range) {
		const [startMins, endMins] = this.asMinutes(range);
		const minuteArr = [];
		let idx = startMins;
		while (true) {
			if (idx === this.EOD) idx = 0;
			minuteArr.push(idx);
			if (idx === endMins) break;
			idx++;
		}
		return minuteArr;
	}

	getMinutes(range: Range) {
		const [startMins, endMins] = this.asMinutes(range);
		return (
			(endMins < startMins ? this.EOD : endMins) -
			startMins +
			(endMins < startMins ? endMins : 0)
		);
	}

	createMinuteMap(range: Range) {
		const [startMins, endMins] = this.asMinutes(range);
		const map = new Map<number, true>();
		let idx = startMins;
		while (true) {
			if (idx === this.EOD) idx = 0;
			map.set(idx, true);
			if (idx === endMins) break;
			idx++;
		}
		return map;
	}

	doMinutesOverlap = (...ranges: Range[]) => {
		const map = new Map<number, true>();
		for (const range of ranges) {
			const [startMins, endMins] = this.asMinutes(range);
			let idx = startMins;
			while (true) {
				if (idx === this.EOD) idx = 0;
				if (
					map.get(idx) &&
					(this.includeEdgesInOverlap || (idx !== startMins && idx !== endMins))
				)
					return true;
				map.set(idx, true);
				if (idx === endMins) break;
				idx++;
			}
		}
		return false;
	};

	areMinutesContained = (parent: Range, ...ranges: Range[]) => {
		if (!ranges.length) return true;
		const map = this.createMinuteMap(parent);
		for (const range of ranges) {
			const [startMins, endMins] = this.asMinutes(range);
			let idx = startMins;
			while (true) {
				if (idx === this.EOD) idx = 0;
				if (!map.has(idx)) return false;

				if (idx === endMins) break;
				idx++;
			}
		}
		return true;
	};

	private asMinutes(inp: Range) {
		const startMins = inp[this.start].hour() * 60 + inp[this.start].minute();
		const endMins = inp[this.end].hour() * 60 + inp[this.end].minute();
		return [startMins, endMins] as const;
	}
}
