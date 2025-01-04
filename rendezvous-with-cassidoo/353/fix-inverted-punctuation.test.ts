// cSpell: disable

import { fixInvertedPunctuation } from "./fix-inverted-punctuation.js";

test("testing fixInvertedPunctuation against test 1", () => {
	const result = fixInvertedPunctuation("Feliz cumpleaños!");
	const expected = "¡Feliz cumpleaños!";
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing fixInvertedPunctuation against test 2", () => {
	const result = fixInvertedPunctuation(
		"Ella ya se graduó de la universidad? No!",
	);
	const expected = "¿Ella ya se graduó de la universidad? ¡No!";
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
