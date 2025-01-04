import { returnGift } from "./return-gift.js";

test("testing returnGift against test 1", () => {
	const result = returnGift("Dec 25, 2023");
	const expected = "Mar 23, 2024";
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});
