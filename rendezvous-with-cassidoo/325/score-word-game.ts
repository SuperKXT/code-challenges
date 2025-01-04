type tuple<
	size extends number,
	tup extends 1[] = [],
> = tup["length"] extends size ? tup : tuple<size, [...tup, 1]>;

type shift<T extends number[]> = T extends [
	unknown,
	...infer R extends number[],
]
	? R
	: never;

type numberToTuple<
	T extends number,
	R extends string = `${T}`,
	A extends number[] = [],
> = R extends `${infer F extends number}${infer L}`
	? numberToTuple<T, L, [...A, F]>
	: A;

type greaterThanDigits<
	T extends number[],
	U extends number[],
	TF extends number[] = tuple<T[0]>,
	UF extends number[] = tuple<U[0]>,
> = T["length"] extends 0
	? false
	: T[0] extends U[0]
		? greaterThanDigits<shift<T>, shift<U>>
		: UF[TF["length"]] extends undefined
			? true
			: false;

type greaterThan<
	T extends number,
	U extends number,
	TA extends number[] = numberToTuple<T>,
	UA extends number[] = numberToTuple<U>,
> = T extends U
	? false
	: TA["length"] extends UA["length"]
		? greaterThanDigits<TA, UA>
		: UA[TA["length"]] extends undefined
			? true
			: false;

type stringToUnion<T extends string> = T extends `${infer first}${infer rest}`
	? first | stringToUnion<rest>
	: never;

type strLength<
	T extends string,
	tup extends 1[] = [],
> = T extends `${string}${infer rest}`
	? strLength<rest, [...tup, 1]>
	: tup["length"];

type multiply<
	times extends number,
	tup extends 1[],
	res extends 1[] = [],
	idx extends 1[] = [],
> = idx["length"] extends times
	? res["length"]
	: multiply<times, tup, [...res, ...tup], [...idx, 1]>;

type wordScore<
	T extends string,
	scores extends Record<stringToUnion<T>, number>,
	str extends string = T,
	score extends 1[] = [],
> = str extends `${infer first}${infer rest}`
	? first extends keyof scores
		? tuple<scores[first]> extends infer newScore extends 1[]
			? wordScore<T, scores, rest, [...score, ...newScore]>
			: never
		: never
	: multiply<strLength<T>, score>;

type ScoreWordGame<
	str extends readonly string[],
	scores extends Record<stringToUnion<str[number]>, number>,
	highest extends { score: number; word: string } = { score: 0; word: "" },
> = str extends readonly [
	infer first extends string,
	...infer rest extends string[],
]
	? scores extends Record<stringToUnion<first>, number>
		? ScoreWordGame<
				rest,
				scores,
				greaterThan<wordScore<first, scores>, highest["score"]> extends true
					? { word: first; score: wordScore<first, scores> }
					: highest
			>
		: never
	: highest["word"];

export const scoreWordGame = <
	const Str extends readonly string[],
	Scores extends Record<stringToUnion<Str[number]>, number>,
>(
	words: Str,
	scores: Scores,
): ScoreWordGame<Str, Scores> => {
	const winner: { score: number; word: string } = { score: 0, word: "" };
	for (const word of words) {
		const score =
			word.length *
			Array.from(word)
				.map((char) => scores[char as keyof typeof scores])
				.reduce((acc, curr) => acc + curr, 0);
		if (score > winner.score) {
			winner.score = score;
			winner.word = word;
		}
	}
	return winner.word as never;
};

type prettify<T> = { [k in keyof T]: T[k] } & {};

type alphabet = "abcdefghijklmnopqrstuvwxyz";

type offset = tuple<98>;

export type LetterScores<
	tup extends string = alphabet,
	map extends Record<string, number> = {},
	idx extends 1[] = [],
> = tup extends `${infer first}${infer rest}`
	? LetterScores<
			rest,
			map & Record<first, [...offset, ...idx]["length"]>,
			[...idx, 1]
		>
	: prettify<map>;
