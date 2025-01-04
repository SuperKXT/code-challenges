import { minLaundryLoads } from "./min-laundry-loads.js";

test("testing waysToScore against test 1", () => {
	const result = minLaundryLoads([
		["red", "normal"],
		["blue", "normal"],
		["red", "delicate"],
		["blue", "heavy"],
	]);
	const expected = 3;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing waysToScore against test 2", () => {
	const result = minLaundryLoads([
		["white", "normal"],
		["white", "delicate"],
		["white", "normal"],
		["white", "heavy"],
	]);
	const expected = 2;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
