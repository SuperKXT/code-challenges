import { luhnCheck } from './luh-check';

test('testing luhnCheck against test 1', () => {
	const result = luhnCheck(123456789);
	const expected = { valid: false } as const;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing luhnCheck against test 2', () => {
	const result = luhnCheck(5555555555554444);
	const expected = { valid: true, brand: 'Mastercard' } as const;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
