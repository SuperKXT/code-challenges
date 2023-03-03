import chalk from 'chalk';
import argumentParser from 'minimist-lite';
import { z } from 'zod';

import { wordleWords } from './word-list';

const EXCLUDE_CHARACTERS_REGEX = /\(([a-z]+)\)/giu;
const VALID_WORD_PATTERN = /((\([a-z]+\))|[a-z*]){5}/iu;
const DUPLICATE_CHARACTER_REGEX = /(.).*\1/iu;
/* cspell: disable-next-line */
const ALPHABETS = 'abcdefghijklmnopqrstuvxwyz';

/* eslint-disable id-length */
export const defaultArgs: Arguments = {
	available: ALPHABETS,
	a: ALPHABETS,
	unavailable: '',
	u: '',
	pattern: '*****',
	p: '*****',
	known: '',
	k: '',
	repeat: true,
};

const argumentSchema = z.strictObject({
	_: z.string().array().length(0).optional(),
	'--': z.string().array().length(0).optional(),
	available: z.string().regex(/^[a-z]{0,26}$/iu),
	a: z.string().regex(/^[a-z]{0,26}$/iu),
	unavailable: z.string().regex(/^[a-z]{0,26}$/iu),
	u: z.string().regex(/^[a-z]{0,26}$/iu),
	pattern: z.string().regex(VALID_WORD_PATTERN),
	p: z.string().regex(VALID_WORD_PATTERN),
	known: z.string().regex(/^[a-z]{0,5}$/iu),
	k: z.string().regex(/^[a-z]{0,5}$/iu),
	repeat: z.boolean(),
});
/* eslint-enable id-length */

export const findWordle = (parameters: Arguments): string[] => {
	const { available, unavailable, pattern, known, repeat } =
		argumentSchema.parse(parameters);

	const availableCharacters = unavailable
		? available.replace(new RegExp(`[${unavailable}]`, 'giu'), '')
		: available;

	const regex = new RegExp(
		pattern
			.replace(/\*/gu, `[${availableCharacters}]`)
			.replace(
				EXCLUDE_CHARACTERS_REGEX,
				(_, p1: string) =>
					`[${availableCharacters.replace(new RegExp(`[${p1}]`, 'giu'), '')}]`
			),
		'iu'
	);

	const matches = wordleWords.filter(
		(word) =>
			(repeat || !DUPLICATE_CHARACTER_REGEX.test(word)) &&
			known.split('').every((character) => word.includes(character)) &&
			regex.test(word)
	);

	if (process.env.NODE_ENV !== 'test') {
		console.info(
			[
				'Found',
				chalk.bgGreen(matches.length),
				`Match${matches.length !== 1 ? 'es' : ''}`,
			].join(' ')
		);
		console.info(chalk.green(matches.join(', ')));
	}
	return matches;
};

export type Arguments = z.infer<typeof argumentSchema>;

if (process.env.NODE_ENV !== 'test') {
	const args = argumentParser<Arguments>(process.argv.slice(2), {
		alias: {
			available: 'a',
			unavailable: 'u',
			pattern: 'p',
			known: 'k',
		},
		default: defaultArgs,
	});
	findWordle(args); // eslint-disable-line jest/require-hook
}
