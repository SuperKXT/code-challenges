import { canPlantFlowers } from "./can-plant-flowers.js";

test("testing canPlantFlowers against test 1", () => {
	const result = canPlantFlowers([1, 0, 0, 0, 1], 1);
	const expected = true;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing canPlantFlowers against test 2", () => {
	const result = canPlantFlowers([1, 0, 0, 0, 1], 2);
	const expected = false;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing canPlantFlowers against test 3", () => {
	const result = canPlantFlowers([0, 0, 0, 0, 0], 3);
	const expected = true;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test("testing canPlantFlowers against test 4", () => {
	const result = canPlantFlowers([1, 0, 1, 0, 1], 1);
	const expected = false;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
