import {
	alphabet,
	lowerAlphabet,
	upperAlphabet,
	wordSeparators,
} from './string-literals.helpers.js';

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

		if (alphabet.includes(current)) currentWord += current;

		const isWordEnd =
			!next ||
			(alphabet.includes(current) && wordSeparators.includes(next)) ||
			(lowerAlphabet.includes(current) && upperAlphabet.includes(next)) ||
			(upperAlphabet.includes(current) &&
				lowerAlphabet.includes(next) &&
				currentWord.length > 1);

		if (!isWordEnd) continue;

		const first = currentWord[0];
		if (first) {
			const formatted =
				casing === 'lower'
					? currentWord.toLowerCase()
					: casing === 'upper'
						? currentWord.toUpperCase()
						: currentWord.toUpperCase() === currentWord
							? currentWord
							: casing === 'title' || !result
								? `${first.toUpperCase()}${currentWord.slice(1).toLowerCase()}`
								: currentWord.toLowerCase();
			result += `${result.length ? ' ' : ''}${formatted}`;
		}
		currentWord = '';
	}

	return result;
};
