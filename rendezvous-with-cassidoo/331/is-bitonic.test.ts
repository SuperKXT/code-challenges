import { isBitonic } from './is-bitonic.js';

test('testing isBitonic against test 1', () => {
	const result = isBitonic([1, 2, 3, 2]);
	const expected = 3;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});

test('testing isBitonic against test 2', () => {
	const result = isBitonic([1, 2, 3]);
	const expected = false;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});

test('testing isBitonic against test 3', () => {
	const result = isBitonic([3, 4, 5, 5, 5, 2, 1]);
	const expected = 5;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});

test('testing isBitonic against test 4', () => {
	const result = isBitonic([]);
	const expected = false;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});

test('testing isBitonic against test 5', () => {
	const result = isBitonic([5, 4, 3]);
	const expected = false;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});

test('testing isBitonic against test 4', () => {
	const result = isBitonic([1, 2, 3, 2, 3]);
	const expected = false;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});
