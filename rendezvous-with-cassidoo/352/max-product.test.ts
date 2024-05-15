import { maxProduct } from './max-product.js';

test('testing maxProduct against test 1', () => {
	const result = maxProduct([2, 4, 1, 3, -5, 6]);
	const expected = 72; // 4 * 3 * 6
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing maxProduct against test 2', () => {
	const result = maxProduct([-1, -2, -3]);
	const expected = -6; // -3 * -2 * -1
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing maxProduct against test 3', () => {
	const result = maxProduct([0, -2, -3]);
	const expected = 0; // -3 * -2 * 0
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing maxProduct against test 4', () => {
	const result = maxProduct([2, 4, -2]);
	const expected = -16; // 4 * 2 * -2
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing maxProduct against test 5', () => {
	const result = maxProduct([5, -4, 3, 2, -12]);
	const expected = 240; // -12 * 5 * -4;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing maxProduct against test 6', () => {
	const result = maxProduct([5, 6, 4, 2, -12]);
	const expected = 120; // 6 * 5 * 4;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing maxProduct against test 7', () => {
	const result = maxProduct([33, 23, -4, 3, -12]);
	const expected = 2277; // 33 * 23 * 3;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing maxProduct against test 8', () => {
	const result = maxProduct([33, 23, -4, 3, -45]);
	const expected = 5940; // 33 * 23 * 3;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
