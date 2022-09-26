import argumentParser from 'minimist-lite';
import z from 'zod';

import { wordleWords } from './word-list';

const CHARACTERS_REGEX = /[a-z]/i;
const EXCLUDE_CHARACTERS_REGEX = /~\(([a-z]+)\)/gi;
const VALID_WORD_PATTERN = /((~\([a-z]+\))|[a-z*]){5}/i;
const DUPLICATE_CHARACTER_REGEX = /(.).*\1/i;
/* cspell: disable-next-line */
const ALPHABETS = 'abcdefghijklmnopqrstuvxwyz';

export const findWordle = (parameters: Arguments): string[] => {

	const parsed = argumentSchema.parse(parameters);
	console.log(parsed);
	const availableCharacters = parsed.available ?? parsed.a ?? ALPHABETS;
	const knownPattern = parsed.pattern ?? parsed.p ?? '*****';
	const knownCharacters = parsed.known ?? parsed.k ?? '';
	const noRepeat = !parsed.repeat;

	const pattern = new RegExp(
		knownPattern
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
		(!noRepeat || !DUPLICATE_CHARACTER_REGEX.test(word))
		&& knownCharacters.split('').every(character => word.includes(character))
		&& pattern.test(word)
	);

	if (process.env.NODE_ENV !== 'test') {
		console.info(`Found \x1b[32m${matches.length}\x1b[0m Match${matches.length !== 1 ? 'es' : ''}`);
		console.info(`\x1b[32m${matches.join(', ')}\x1b[0m`);
	}
	return matches;

};

const argumentSchema = z.strictObject({
	'_': z.string().array().length(0).optional(),
	'--': z.string().array().length(0).optional(),
	available: z.string().regex(CHARACTERS_REGEX).min(1).max(26).optional(),
	a: z.string().regex(CHARACTERS_REGEX).min(1).max(26).optional(),
	pattern: z.string().regex(VALID_WORD_PATTERN).optional(),
	p: z.string().regex(VALID_WORD_PATTERN).optional(),
	known: z.string().regex(CHARACTERS_REGEX).min(1).max(5).optional(),
	k: z.string().regex(CHARACTERS_REGEX).min(1).max(5).optional(),
	repeat: z.boolean(),
});

export type Arguments = z.infer<typeof argumentSchema>;

if (process.env.NODE_ENV !== 'test') {
	const args = argumentParser<Arguments>(process.argv.slice(2));
	findWordle(args); // eslint-disable-line jest/require-hook
}