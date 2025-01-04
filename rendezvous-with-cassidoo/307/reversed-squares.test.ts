import { reversedSquare } from "./reversed-squares.js";

test("testing reversedSquares against test 1", () => {
	const result = reversedSquare(9);
	expect(result).toBeTruthy();
	assertType<true>(result);
});

test("testing reversedSquares against test 2", () => {
	const result = reversedSquare(10);
	expect(result).toBeFalsy();
	assertType<false>(result);
});

test("testing reversedSquares against test 3", () => {
	const result = reversedSquare(441);
	expect(result).toBeTruthy();
	assertType<true>(result);
});

test("testing reversedSquares against test 4", () => {
	const result = reversedSquare(25);
	expect(result).toBeFalsy();
	assertType<false>(result);
});
