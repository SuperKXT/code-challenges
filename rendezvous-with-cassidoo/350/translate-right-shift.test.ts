import { translateShiftRight } from './translate-right-shift.js';

test('testing translateShiftRight against test 1', () => {
	const result = translateShiftRight(';p; epeor'); // cSpell: disable-line
	const expected = 'lol wowie'; // cSpell: disable-line
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing translateShiftRight against test 2', () => {
	const result = translateShiftRight('ejp s, o');
	const expected = 'who am i';
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
