import { daysBetween } from "./days-between.js";

test("testing daysBetween against test 1", () => {
	const result = daysBetween("2024-01-01", "2024-01-29");
	const expected = 28;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});

test("testing daysBetween against test 2", () => {
	const result = daysBetween("2020-02-29", "2023-10-31");
	const expected = 1340;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});

test("testing daysBetween against test 3", () => {
	expect(() => daysBetween("2020-02-29", "incorrect date")).toThrow(
		"invalid date input. required: YYYY-MM-DD",
	);
});
