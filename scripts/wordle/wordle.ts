import chalk from 'chalk';
import argumentParser from 'minimist-lite';
import { z } from 'zod';

import { WORDLE_WORDS } from './word-list.js';

const EXCLUDE_CHARACTERS_REGEX = /\(([a-z]+)\)/giu;
const VALID_WORD_PATTERN = /((\([a-z]+\))|[a-z*]){5}/iu;
const DUPLICATE_CHARACTER_REGEX = /(.).*\1/iu;
/* cspell: disable-next-line */
const ALPHABETS = 'abcdefghijklmnopqrstuvxwyz';

export const DEFAULT_ARGS: Arguments = {
	a: ALPHABETS,
	available: ALPHABETS,
	k: '',
	known: '',
	p: '*****',
	pattern: '*****',
	repeat: true,
	u: '',
	unavailable: '',
};

const ARGUMENT_SCHEMA = z.strictObject({
	'--': z.string().array().length(0).optional(),
	_: z.string().array().length(0).optional(),
	a: z.string().regex(/^[a-z]{0,26}$/iu),
	available: z.string().regex(/^[a-z]{0,26}$/iu),
	k: z.string().regex(/^[a-z]{0,5}$/iu),
	known: z.string().regex(/^[a-z]{0,5}$/iu),
	p: z.string().regex(VALID_WORD_PATTERN),
	pattern: z.string().regex(VALID_WORD_PATTERN),
	repeat: z.boolean(),
	u: z.string().regex(/^[a-z]{0,26}$/iu),
	unavailable: z.string().regex(/^[a-z]{0,26}$/iu),
});

export const findWordle = (parameters: Arguments): string[] => {
	const { available, unavailable, pattern, known, repeat } =
		ARGUMENT_SCHEMA.parse(parameters);

	const availableCharacters = unavailable
		? available.replace(new RegExp(`[${unavailable}]`, 'giu'), '')
		: available;

	const regex = new RegExp(
		pattern
			.replace(/\*/gu, `[${availableCharacters}]`)
			.replace(
				EXCLUDE_CHARACTERS_REGEX,
				(_, p1: string) =>
					`[${availableCharacters.replace(new RegExp(`[${p1}]`, 'giu'), '')}]`,
			),
		'iu',
	);

	const matches = WORDLE_WORDS.filter(
		(word) =>
			(repeat || !DUPLICATE_CHARACTER_REGEX.test(word)) &&
			known.split('').every((character) => word.includes(character)) &&
			regex.test(word),
	);

	if (process.env.NODE_ENV !== 'test') {
		console.info(
			[
				'Found',
				chalk.bgGreen(matches.length),
				`Match${matches.length !== 1 ? 'es' : ''}`,
			].join(' '),
		);
		console.info(chalk.green(matches.join(', ')));
	}
	return matches;
};

export type Arguments = z.infer<typeof ARGUMENT_SCHEMA>;

if (process.env.NODE_ENV !== 'test') {
	const args = argumentParser<Arguments>(process.argv.slice(2), {
		alias: {
			available: 'a',
			known: 'k',
			pattern: 'p',
			unavailable: 'u',
		},
		default: DEFAULT_ARGS,
	});
	findWordle(args);
}
