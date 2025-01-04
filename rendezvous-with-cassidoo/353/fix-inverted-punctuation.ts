const delimiters = [".", "?", "!"] as const;

type Delimiter = (typeof delimiters)[number];

const startMap = { "?": "¿", "!": "¡" } as const;

type StartMap = typeof startMap;

type AppendStart<
	Sentence extends string,
	end extends Delimiter,
> = end extends keyof StartMap
	? Sentence extends `${StartMap[end]}${string}`
		? Sentence
		: `${StartMap[end]}${Sentence}`
	: Sentence;

type FixInvertedPunctuation<
	Input extends string,
	Fixed extends string = "",
	Sentence extends string = "",
> = Input extends `${infer first}${infer rest}`
	? [Sentence, first] extends ["", " "]
		? FixInvertedPunctuation<rest, `${Fixed} `, Sentence>
		: first extends Delimiter
			? FixInvertedPunctuation<
					rest,
					`${Fixed}${AppendStart<`${Sentence}${first}`, first>}`
				>
			: FixInvertedPunctuation<rest, Fixed, `${Sentence}${first}`>
	: `${Fixed}${Sentence}`;

export const fixInvertedPunctuation = <Input extends string>(
	input: Input,
): FixInvertedPunctuation<Input> => {
	let fixed = "";
	let sentence = "";
	for (const char of input) {
		if (!sentence && char === " ") {
			fixed += " ";
			continue;
		}
		sentence += char;
		if (delimiters.includes(char as never)) {
			const start = (startMap as Record<string, string>)[char];
			if (start && !sentence.startsWith(start))
				sentence = `${start}${sentence}`;
			fixed += sentence;
			sentence = "";
		}
	}
	fixed += sentence;
	return fixed as never;
};
