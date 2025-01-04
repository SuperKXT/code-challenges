import {
	alphabet,
	alphaNumeric,
	lowerAlphabet,
	numeric,
	upperAlphabet,
	wordSeparators,
} from "./string-literals.helpers.js";

import type { Utils } from "../types/utils.types.js";
import type {
	Alphabet,
	AlphaNumeric,
	LowerAlphabet,
	Numeric,
	UpperAlphabet,
	WordSeparators,
} from "./string-literals.helpers.js";

type Strategy = "camel" | "pascal" | "snake" | "kebab" | "constant" | "human";

const separatorMap = {
	camel: "",
	pascal: "",
	snake: "_",
	kebab: "-",
	constant: "_",
	human: " ",
} as const;

type SeparatorMap = typeof separatorMap;

type _firstChar<
	char extends string,
	strategy extends Strategy,
> = `${SeparatorMap[strategy]}${strategy extends "kebab" | "snake" | "human"
	? Lowercase<char>
	: Uppercase<char>}`;

type _formatChar<
	char extends string,
	lastChar extends string,
	strategy extends Strategy,
	formatted extends string,
> =
	char extends Exclude<char, AlphaNumeric> // char !== AlphaNumeric
		? ""
		: formatted extends ""
			? strategy extends "pascal" | "constant"
				? Uppercase<char>
				: Lowercase<char>
			: [char, lastChar] extends
						| [Alphabet, WordSeparators]
						| [UpperAlphabet, LowerAlphabet]
						| [Numeric, Exclude<lastChar, Numeric>]
				? _firstChar<char, strategy>
				: strategy extends "constant"
					? Uppercase<char>
					: Lowercase<char>;

type _formatToken<
	str extends string,
	strategy extends Strategy,
	lastChar extends string = "",
	formatted extends string = "",
> = str extends `${infer first}${infer rest}`
	? _formatToken<
			rest,
			strategy,
			first,
			`${formatted}${_formatChar<first, lastChar, strategy, formatted>}`
		>
	: formatted;

export type FormatToken<
	str extends string,
	strategy extends Strategy,
> = str extends str ? _formatToken<Utils.trim<str>, strategy> : never;

/**
 * Takes a token name, and format strategy and returns the converted token name
 * @param string the string to format
 * @param strategy - the strategy to format the string
 * @example formatToken('camelCaseString', 'kebab') => 'camel-case-string'
 */
export const formatToken = <T extends string, S extends Strategy>(
	input: T,
	strategy: S,
): FormatToken<T, S> => {
	const string = input.trim();
	if (!string) return "" as never;

	let formatted = "";

	for (let index = 0; index < string.length; index++) {
		const current = string[index] as string;
		const last = string[index - 1];

		if (!alphaNumeric.includes(current)) continue;

		if (!last || !formatted) {
			formatted += ["pascal", "constant"].includes(strategy)
				? current.toUpperCase()
				: current.toLowerCase();
		} else if (
			(alphabet.includes(current) && wordSeparators.includes(last)) ||
			(upperAlphabet.includes(current) && lowerAlphabet.includes(last)) ||
			(numeric.includes(current) && !numeric.includes(last))
		) {
			const char = ["kebab", "snake", "human"].includes(strategy)
				? current.toLowerCase()
				: current.toUpperCase();
			formatted += `${separatorMap[strategy]}${char}`;
		} else {
			formatted +=
				strategy === "constant" ? current.toUpperCase() : current.toLowerCase();
		}
	}

	return formatted as never;
};
