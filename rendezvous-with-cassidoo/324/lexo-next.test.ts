import { lexoNext } from './lexo-next.js';

test('testing lexoNext against test 1', () => {
	const result = lexoNext(123);
	const expected = 132;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing lexoNext against test 2', () => {
	const result = lexoNext(314159);
	const expected = 314195;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});

test('testing lexoNext against test 3', () => {
	const result = lexoNext(1111);
	const expected = 1111;
	expect(result).toStrictEqual(expected);
	assertType<typeof result>(expected);
});
