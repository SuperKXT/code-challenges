import { newYearsDay } from './new-years-day.js';

test('testing newYearsDay 1', () => {
	const result = newYearsDay(2025);
	const expected: string = 'Wednesday';
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof expected>>(result);
});
test('testing newYearsDay 2', () => {
	const result = newYearsDay(2024);
	const expected: string = 'Monday';
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof expected>>(result);
});
