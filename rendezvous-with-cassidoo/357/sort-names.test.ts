import { sortNames } from './sort-names.js';

test('testing sortNames against test 1', () => {
	const result = sortNames(['Goku', 'Vegeta', 'Piccolo', 'Gohan']); // cSpell: disable-line
	const expected = ['Piccolo', 'Vegeta', 'Gohan', 'Goku']; // cSpell: disable-line
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing sortNames against test 2', () => {
	const result = sortNames(['Edward', 'Alphonse', 'Winry', 'Roy']); // cSpell: disable-line
	const expected = ['Alphonse', 'Edward', 'Roy', 'Winry']; // cSpell: disable-line
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
