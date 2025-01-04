import { rollCall } from "./roll-call.js";

test("testing rollCall 1", () => {
	const result = rollCall(["yzneT", "ydissaC", "enimA"]);
	const expected = ["Amine", "Cassidy", "Tenzy"];
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof expected>>(result);
});
test("testing rollCall 2", () => {
	// cSpell: disable
	const result = rollCall([
		"rennoD",
		"nexiV",
		"recnarP",
		"temoC",
		"neztilB",
		"recnaD",
		"dipuC",
		"rehsaD",
		"hploduR",
	]);
	const expected = [
		"Blitzen",
		"Comet",
		"Cupid",
		"Dancer",
		"Dasher",
		"Donner",
		"Prancer",
		"Rudolph",
		"Vixen",
	];
	// cSpell: enable
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof expected>>(result);
});

test("testing rollCall 3", () => {
	const result = rollCall(["A", "B", "C"]);
	const expected = ["A", "B", "C"];
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof expected>>(result);
});
