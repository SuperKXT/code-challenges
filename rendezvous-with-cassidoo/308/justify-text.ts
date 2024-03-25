type tuple<
	size extends number,
	T = 1,
	result extends readonly T[] = [],
> = result['length'] extends size ? result : tuple<size, T, [...result, T]>;

type stringToTuple<T extends string> = T extends `${infer first}${infer rest}`
	? [first, ...stringToTuple<rest>]
	: [];

type join<
	T extends readonly string[],
	joiner extends string = '',
> = T extends readonly [
	infer first extends string,
	...infer rest extends readonly string[],
]
	? rest extends []
		? first
		: `${first}${joiner}${join<rest, joiner>}`
	: '';

type lines<
	T extends readonly string[],
	len extends number,
	lenTup extends 1[] = tuple<len>,
	result extends readonly (readonly string[])[] = [],
	currLine extends readonly string[] = [],
> = T extends readonly [
	infer first extends string,
	...infer rest extends readonly string[],
]
	? stringToTuple<
			join<[...currLine, first], ' '>
		>[lenTup['length']] extends string
		? currLine extends []
			? lines<rest, len, lenTup, result, [...currLine, first]>
			: lines<rest, len, lenTup, [...result, currLine], [first]>
		: lines<rest, len, lenTup, result, [...currLine, first]>
	: currLine extends []
		? result
		: [...result, currLine];

type spacesRequired<T extends readonly string[], maxWidth extends number> =
	tuple<maxWidth, ' '> extends readonly [
		...tuple<stringToTuple<join<T>>['length'], ' '>,
		...infer spaces extends ' '[],
	]
		? spaces
		: [];

type divide<
	T extends unknown[],
	U extends unknown[],
	result extends 1[] = [],
> = T extends [...U, ...infer rest]
	? divide<rest, U, [...result, 1]>
	: T extends []
		? result['length']
		: [...result, 1]['length'];

type spacesPerWordRequired<
	spaces extends ' '[],
	line extends readonly string[],
> = line extends readonly [unknown, ...infer rest]
	? rest extends []
		? spaces['length']
		: divide<tuple<spaces['length']>, tuple<rest['length']>>
	: spaces['length'];

type divideSpaces<
	spaces extends ' '[],
	spacesPerWord extends number,
	current extends ' '[] = [],
> = current['length'] extends spacesPerWord
	? { left: spaces; current: current }
	: spaces extends [infer first extends ' ', ...infer rest extends ' '[]]
		? divideSpaces<rest, spacesPerWord, [...current, first]>
		: { left: spaces; current: current };

type justifyLine<
	line extends readonly string[],
	maxWidth extends number,
	spaces extends ' '[] = spacesRequired<line, maxWidth>,
	spacesPerWord extends number = spacesPerWordRequired<spaces, line>,
	divided extends { left: ' '[]; current: ' '[] } = divideSpaces<
		spaces,
		spacesPerWord
	>,
> = line extends readonly [
	infer first extends string,
	...infer rest extends readonly string[],
]
	? `${first}${join<divided['current']>}${justifyLine<
			rest,
			maxWidth,
			divided['left'],
			spacesPerWord
		>}`
	: '';

type JustifyText<
	T extends readonly string[],
	maxWidth extends number,
	lineTup extends readonly (readonly string[])[] = lines<T, maxWidth>,
> = lineTup extends readonly [
	infer first extends readonly string[],
	...infer rest extends readonly (readonly string[])[],
]
	? readonly [
			justifyLine<first, maxWidth>,
			...JustifyText<never, maxWidth, rest>,
		]
	: readonly [];

export const justifyText = <
	const words extends readonly string[],
	maxWidth extends number,
>(
	words: words,
	maxWidth: maxWidth,
): JustifyText<words, maxWidth> => {
	const lines: string[][] = [];
	let currLine: string[] | null = null;
	for (const word of words) {
		if (!currLine || [...currLine, word].join(' ').length >= maxWidth) {
			currLine = [word];
			lines.push(currLine);
			continue;
		}
		currLine.push(word);
	}

	const justified: string[] = [];
	for (const line of lines) {
		const spaces = Array<string>(
			Math.max(maxWidth - line.join(' ').length, 0),
		).fill(' ');
		const spacePerWord = Math.ceil(
			spaces.length / Math.max(line.length - 1, 1),
		);
		justified.push(
			line
				.map(
					(word, idx) =>
						word +
						spaces.splice(0, spacePerWord).join('') +
						(line[idx + 1] ? ' ' : ''),
				)
				.join(''),
		);
	}
	return justified as never;
};
