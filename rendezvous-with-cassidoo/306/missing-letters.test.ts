import { missingLetters } from './missing-letters';

test('testing missingLetters against test 1', () => {
	const response = missingLetters(['a', 'b', 'c', 'd', 'f']);
	const expected = ['e'] as const;
	expect(response).toStrictEqual(expected);
	assertType<typeof expected>(response);
});

test('testing missingLetters against test 2', () => {
	const response = missingLetters([
		'a',
		'b',
		'c',
		'd',
		'e',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'w',
		'x',
		'y',
		'z',
	]);
	const expected = ['f', 'g', 'v'] as const;
	expect(response).toStrictEqual(expected);
	assertType<typeof expected>(response);
});

test('testing missingLetters against test 3', () => {
	const response = missingLetters(['a', 'b']);
	const expected = [] as const;
	expect(response).toStrictEqual(expected);
	assertType<typeof expected>(response);
});

test('testing missingLetters against test 4', () => {
	const response = missingLetters([]);
	const expected = [] as const;
	expect(response).toStrictEqual(expected);
	assertType<typeof expected>(response);
});
