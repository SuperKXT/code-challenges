const regex = /([^¿\s].*)[?]|([^¡\s].*)[!]/u;

const str = 'Ella ya se graduó de la universidad? No!';

const delimiters = ['.', '?', '!'] as const;

type Delimiter = (typeof delimiters)[number];

const map = { '?': '¿', '!': '¡' } as const;

export const fixInvertedPunctuation = (input: string) => {
	let fixed = '';
	let sentence = '';
	for (const char of input) {
		if (!sentence && char === ' ') {
			fixed += ' ';
			continue;
		}
		sentence += char;
		if (sentence && delimiters.includes(char as never)) {
			const start = (map as Record<string, string>)[char];
			if (start && !sentence.startsWith(start))
				sentence = `${start}${sentence}`;
			fixed += sentence;
			sentence = '';
		}
	}
	fixed += sentence;
	return fixed;
};
