import { squares } from './squares.js';

test('testing squares against test 1', () => {
	const result = squares(5); // cSpell: disable-line
	const expected = 55;
	expect(result).toStrictEqual(expected);
	assertType<typeof expected>(result);
});

test('testing squares against test 2', () => {
	const result = squares(10); // cSpell: disable-line
	const expected = 385;
	expect(result).toStrictEqual(expected);
	assertType<typeof expected>(result);
});

test('testing squares against test 3', () => {
	const result = squares(25); // cSpell: disable-line
	const expected = 5525;
	expect(result).toStrictEqual(expected);
	assertType<typeof expected>(result);
});

test('testing squares against test 4', () => {
	const result = squares(100); // cSpell: disable-line
	const expected = 338350;
	expect(result).toStrictEqual(expected);
	assertType<typeof expected>(result);
});
