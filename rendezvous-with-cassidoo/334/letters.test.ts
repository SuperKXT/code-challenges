import { letters } from './letters.js';

test('testing letters against test 1', () => {
	const result = letters(['X']);
	const expected = ['X'] as const;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});

test('testing letters against test 2', () => {
	const result = letters(['A', 'A', 'B']);
	const expected = ['A', 'AA', 'AAB', 'AB', 'ABA', 'B', 'BA', 'BAA'] as const;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});

test('testing letters against test 3', () => {
	const result = letters(['A', 'B', 'C']);
	const expected = [
		'A',
		'AB',
		'ABC',
		'AC',
		'ACB',
		'B',
		'BA',
		'BAC',
		'BC',
		'BCA',
		'C',
		'CA',
		'CAB',
		'CB',
		'CBA',
	] as const;
	expect(result).toStrictEqual(expected);
	assertType<Readonly<typeof result>>(expected);
});
