import {
	alphabet,
	lowerAlphabet,
	upperAlphabet,
	wordSeparators,
} from '~/helpers/string/string-literals';

export const humanizeCases = ['lower', 'sentence', 'title', 'upper'] as const;

export type HumanizeCase = (typeof humanizeCases)[number];

/**
 * Takes a token name and returns a human readable string
 * @param string the string to humanize
 * @param casing - the casing for the humanized string. defaults to 'title'
 * @example humanizeToken('camelCaseString', 'sentence') => 'Camel case string'
 */
export const humanizeToken = (
	input: string,
	casing: HumanizeCase = 'title',
): string => {
	const string = input.trim();
	if (!string.trim()) return '';

	let result: string = '';
	let currentWord: string = '';

	for (let index = 0; index < string.length; index++) {
		const current = string[index] as string;
		const next = string[index + 1];

		if (!alphabet.includes(current)) {
			if (casing === 'upper') return (currentWord += current.toUpperCase());
			if (casing === 'lower') return (currentWord += current.toLowerCase());
			if (!currentWord && (casing === 'title' || !result))
				return current.toUpperCase();
			if (currentWord && currentWord.toUpperCase() === currentWord)
				return current;
			return current.toLowerCase();
		}

		const isWordEnd =
			!next ||
			(alphabet.includes(current) && wordSeparators.includes(next)) ||
			(lowerAlphabet.includes(current) && upperAlphabet.includes(next)) ||
			(upperAlphabet.includes(current) &&
				lowerAlphabet.includes(next) &&
				current.length > 1);

		const isLastId = next !== undefined || currentWord.toLowerCase() !== 'id';

		if (isWordEnd) {
			currentWord = '';
			if (!isLastId) continue;
			result += ` ${currentWord}`;
		}
	}

	return result;
};
