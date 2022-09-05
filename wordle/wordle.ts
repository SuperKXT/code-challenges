import argumentParser from 'minimist-lite';
import z from 'zod';

import { wordleWords } from './word-list';

const charactersPattern = /[a-z]/i;
const excludeCharactersPattern = /-\(([a-z]+)\)/gi;
const validWordPattern = /((-\([a-z]+\))|[a-z*]){5}/i;
/* cspell: disable-next-line */
const alphabets = 'abcdefghijklmnopqrstuvxwyz';

export const findWordle = (parameters: Arguments): string[] => {

	const parsed = argumentSchema.parse(parameters);
	const availableCharacters = parsed.available ?? parsed.a ?? alphabets;
	const knownPattern = parsed.pattern ?? parsed.p ?? '*****';
	const knownCharacters = parsed.known ?? parsed.k ?? '';

	const pattern = new RegExp(
		knownPattern
			.replace(
				/\*/g,
				`[${availableCharacters}]`
			)
			.replace(
				excludeCharactersPattern,
				(_, p1) => `[${availableCharacters.replace(new RegExp(`[${p1}]`, 'gi'), '')}]`
			),
		'i'
	);

	const matches = wordleWords.filter(word =>
		knownCharacters.split('').every(character => word.includes(character))
		&& pattern.test(word)
	);

	if (process.env.NODE_ENV !== 'test') {
		console.log(`Found (\x1b[32m${matches.length}\x1b[0m) Matches`);
		console.log(`\x1b[32m${matches.join(', ')}\x1b[0m`);
	}
	return matches;

};

const argumentSchema = z.strictObject({
	'_': z.string().array().length(0).optional(),
	'--': z.string().array().length(0).optional(),
	available: z.string().regex(charactersPattern).min(1).max(26).optional(),
	a: z.string().regex(charactersPattern).min(1).max(26).optional(),
	pattern: z.string().regex(validWordPattern).optional(),
	p: z.string().regex(validWordPattern).optional(),
	known: z.string().regex(charactersPattern).min(1).max(5).optional(),
	k: z.string().regex(charactersPattern).min(1).max(5).optional(),
});

export type Arguments = z.infer<typeof argumentSchema>;

if (process.env.NODE_ENV !== 'test') {
	const args = argumentParser<Arguments>(process.argv.slice(2));
	findWordle(args); // eslint-disable-line jest/require-hook
}