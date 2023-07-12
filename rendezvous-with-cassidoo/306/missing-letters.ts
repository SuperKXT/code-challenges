const alphabets = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
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
	'v',
	'w',
	'x',
	'y',
	'z',
] as const;

type AlphabetArray = typeof alphabets;

type Alphabet = AlphabetArray[number];

export type MissingLetters<
	T extends readonly Alphabet[],
	A extends readonly any[] = AlphabetArray,
	Flag extends boolean = false,
	Gaps extends readonly Alphabet[] = [],
> = A extends readonly [infer F extends Alphabet, ...infer R]
	? F extends [0, ...T][T['length']]
		? Gaps
		: Flag extends false
		? MissingLetters<T, R, F extends T[0] ? true : false>
		: MissingLetters<T, R, true, F extends T[number] ? Gaps : [...Gaps, F]>
	: Gaps;

export const missingLetters = <const T extends readonly Alphabet[]>(
	array: T,
): MissingLetters<T> => {
	const missing: string[] = [];
	for (let i = 1; i < array.length; i++) {
		const currCode = array[i]?.charCodeAt(0) ?? 0;
		const lastCode = array[i - 1]?.charCodeAt(0) ?? 0;
		for (let j = lastCode + 1; j < currCode; j++)
			missing.push(String.fromCharCode(j));
	}
	return missing as never;
};
