export type FormatTokenStrategy = (
	| 'camel'
	| 'pascal'
	| 'snake'
	| 'kebab'
	| 'constant'
);

export type HumanizeTokenCase = (
	| 'sentence'
	| 'title'
	| 'lower'
	| 'upper'
);

const lowerCase = 'abcdefghijklmnopqrstuvwxyz' as const;
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' as const;
const numbers = '0123456789' as const;
const alphabet = `${lowerCase}${upperCase}` as const;
const separators = ` \n-_.${numbers}` as const;

/**
 * Takes a token name, and format strategy and returns the converted token name
 * @param string the string to format
 * @param strategy - the strategy to format the string. defaults to 'camel'
 * @example formatToken('camelCaseString', 'kebab') => 'camel-case-string'
*/
export const formatToken = (
	input: string,
	strategy: FormatTokenStrategy = 'camel'
): string => {

	const string = input.trim();
	if (!string) return '';

	let formatted = '';

	for (let index = 0; index < string.length; index++) {

		const current = string[index] as string;
		const last = string[index - 1];

		if (
			!alphabet.includes(current)
			&& !numbers.includes(current)
		) continue;

		if (!formatted) {
			switch (strategy) {
				case 'camel':
				case 'kebab':
				case 'snake': {
					formatted += current.toLowerCase();
					break;
				}
				case 'pascal':
				case 'constant': {
					formatted += current.toUpperCase();
					break;
				}
			}
		}
		else if (
			(alphabet.includes(current) && last && separators.includes(last))
			|| (upperCase.includes(current) && last && lowerCase.includes(last))
		) {
			switch (strategy) {
				case 'camel': {
					formatted += current.toUpperCase();
					break;
				}
				case 'constant': {
					formatted += `_${current.toUpperCase()}`;
					break;
				}
				case 'kebab': {
					formatted += `-${current.toLowerCase()}`;
					break;
				}
				case 'pascal': {
					formatted += current.toUpperCase();
					break;
				}
				case 'snake': {
					formatted += formatted
						? `_${current.toLowerCase()}`
						: current.toLowerCase();
					break;
				}
			}
		}
		else if (
			['kebab', 'snake', 'constant'].includes(strategy)
			&& numbers.includes(current)
			&& formatted.at(-1)
			&& (alphabet.includes(formatted.at(-1) ?? ''))
		) {
			formatted += `${strategy === 'kebab' ? '-' : '_'}${current}`;
		}
		else {
			switch (strategy) {
				case 'camel':
				case 'kebab':
				case 'pascal':
				case 'snake': {
					formatted += current.toLowerCase();
					break;
				}
				case 'constant': {
					formatted += current.toUpperCase();
					break;
				}
			}
		}

	}

	return formatted;

};

/**
 * Takes a token name and returns a human readable string
 * @param string the string to humanize
 * @param casing - the casing for the humanized string. defaults to 'title'
 * @example humanizeToken('camelCaseString', 'sentence') => 'Camel case string'
*/
export const humanizeToken = (
	input: string,
	casing: HumanizeTokenCase = 'title'
): string => {

	const string = input.trim();
	if (!string.trim()) return '';

	let formatted = '';

	for (let index = 0; index < string.length; index++) {

		const current = string[index] as string;
		const last = string[index - 1] as string;

		if (!alphabet.includes(current)) continue;

		if (!formatted) {
			switch (casing) {
				case 'lower': {
					formatted += current.toLowerCase();
					break;
				}
				case 'sentence':
				case 'title':
				case 'upper': {
					formatted += current.toUpperCase();
					break;
				}
			}
		}
		else if (
			(alphabet.includes(current) && separators.includes(last))
			|| (upperCase.includes(current) && lowerCase.includes(last))
		) {
			formatted += ' ';
			switch (casing) {
				case 'lower':
				case 'sentence': {
					formatted += current.toLowerCase();
					break;
				}
				case 'title':
				case 'upper': {
					formatted += current.toUpperCase();
					break;
				}
			}
		}
		else {
			switch (casing) {
				case 'lower':
				case 'sentence':
				case 'title': {
					formatted += current.toLowerCase();
					break;
				}
				case 'upper': {
					formatted += current.toUpperCase();
					break;
				}
			}
		}

	}

	if (
		formatted.toLowerCase().endsWith(' id')
	) formatted = formatted.slice(0, -3);

	return formatted;

};
