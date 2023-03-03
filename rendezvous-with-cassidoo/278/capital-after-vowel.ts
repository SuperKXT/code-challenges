interface Solution {
	withRegex: string;
	withoutRegex: string;
}

const VOWELS = 'aeiou';
const CONSONANTS = 'bcdfghjklmnpqrstvwxyz';
const REGEX = new RegExp(`(?<=[${VOWELS}]\\s*)[${CONSONANTS}]`, 'gu');

export const capitalAfterVowel = (input: string): Solution => {
	return {
		withRegex: input.replace(REGEX, (value) => value.toUpperCase()),
		withoutRegex: Array.from(input, (char, index) => {
			const last = input.slice(0, index).trim().at(-1);
			const isConsonantAfterVowel =
				CONSONANTS.includes(char) && last && VOWELS.includes(last);
			return isConsonantAfterVowel ? char.toUpperCase() : char;
		}).join(''),
	};
};
