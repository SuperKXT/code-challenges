import argumentParser from 'minimist-lite';
import z from 'zod';

import { wordleWords } from './word-list';

const EXCLUDE_CHARACTERS_REGEX = /\(([a-z]+)\)/gi;
const VALID_WORD_PATTERN = /((\([a-z]+\))|[a-z*]){5}/i;
const DUPLICATE_CHARACTER_REGEX = /(.).*\1/i;
/* cspell: disable-next-line */
const ALPHABETS = 'abcdefghijklmnopqrstuvxwyz';

export const defaultArguments: Arguments = {
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

export const findWordle = (parameters: Arguments): string[] => {

	const {
		available,
		unavailable,
		pattern,
		known,
		repeat,
	} = argumentSchema.parse(parameters);

	const availableCharacters = (
		unavailable
			? available.replace(new RegExp(`[${unavailable}]`, 'gi'), '')
			: available
	);

	const regex = new RegExp(
		pattern
			.replace(
				/\*/g,
				`[${availableCharacters}]`
			)
			.replace(
				EXCLUDE_CHARACTERS_REGEX,
				(_, p1) => `[${availableCharacters.replace(new RegExp(`[${p1}]`, 'gi'), '')}]`
			),
		'i'
	);

	const matches = wordleWords.filter(word =>
		(repeat || !DUPLICATE_CHARACTER_REGEX.test(word))
		&& known.split('').every(character => word.includes(character))
		&& regex.test(word)
	);

	if (process.env.NODE_ENV !== 'test') {
		console.info(`Found \x1b[32m${matches.length}\x1b[0m Match${matches.length !== 1 ? 'es' : ''}`);
		console.info(`\x1b[32m${matches.join(', ')}\x1b[0m`);
	}
	return matches;

};

const argumentSchema = z.strictObject({
	_: z.string().array().length(0).optional(),
	'--': z.string().array().length(0).optional(),
	available: z.string().regex(/^[a-z]{0,26}$/i),
	a: z.string().regex(/^[a-z]{0,26}$/i),
	unavailable: z.string().regex(/^[a-z]{0,26}$/i),
	u: z.string().regex(/^[a-z]{0,26}$/i),
	pattern: z.string().regex(VALID_WORD_PATTERN),
	p: z.string().regex(VALID_WORD_PATTERN),
	known: z.string().regex(/^[a-z]{0,5}$/i),
	k: z.string().regex(/^[a-z]{0,5}$/i),
	repeat: z.boolean(),
});

export type Arguments = z.infer<typeof argumentSchema>;

if (process.env.NODE_ENV !== 'test') {
	const args = argumentParser<Arguments>(process.argv.slice(2), {
		alias: {
			available: 'a',
			unavailable: 'u',
			pattern: 'p',
			known: 'k',
		},
		default: defaultArguments,
	});
	findWordle(args); // eslint-disable-line jest/require-hook
}
