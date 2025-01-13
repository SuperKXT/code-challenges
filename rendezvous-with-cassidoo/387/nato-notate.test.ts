import { natoNotate } from "./nato-notate.js";

test("testing natoNotate 1", () => {
	const result = natoNotate("hello world");
	const expected =
		"Hotel Echo Lima Lima Oscar (space) Whiskey Oscar Romeo Lima Delta";
	expect(result).toStrictEqual(expected);
	assertType<typeof expected>(result);
});

test("testing natoNotate 2", () => {
	const result = natoNotate("3spooky5me");
	const expected = "Three Sierra Papa Oscar Oscar Kilo Yankee Five Mike Echo";
	expect(result).toStrictEqual(expected);
	assertType<typeof expected>(result);
});
