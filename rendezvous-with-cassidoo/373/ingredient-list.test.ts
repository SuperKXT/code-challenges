import { ingredientList } from "./ingredient-list.js";

test("testing ingredientList", () => {
	const result1 = ingredientList({
		recipe: ["eggs", "flour", "sugar", "butter"],
		pantry: ["sugar", "butter", "milk"],
	});
	const expected1 = 2;
	expect(result1).toStrictEqual(expected1);
	assertType<Readonly<typeof result1>>(expected1);
});
