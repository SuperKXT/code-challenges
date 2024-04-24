import { printArrow } from './print-arrow.js';

test('testing printArrow against test 1', () => {
	const result = printArrow('right', 3);
	const expected = '*\n *\n  *\n *\n*';
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing printArrow against test 1', () => {
	const result = printArrow('left', 5);
	const expected = '    *\n   *\n  *\n *\n*\n *\n  *\n   *\n    *\n     *';
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing printArrow against test 3', () => {
	const result = printArrow('up', 2);
	const expected = ' *\n* *';
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing printArrow against test 3', () => {
	const result = printArrow('down', 4);
	const expected = '   *\n  * *\n *   *\n*     *';
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
