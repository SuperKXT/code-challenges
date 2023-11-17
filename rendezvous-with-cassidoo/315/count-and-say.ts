const words = [
	'zero',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
	'eleven',
	'twelve',
	'thirteen',
	'fourteen',
	'fifteen',
	'sixteen',
] as const;

type Words = typeof words;

type joinWords<T extends string[], isFirst = true> = T extends [
	infer first extends string,
	...infer rest extends string[],
]
	? `${isFirst extends true ? '' : ', then '}${first}${joinWords<rest, false>}`
	: '';

type say<char extends string, count extends number[]> = `${Words[[
	...count,
	1,
]['length']]} ${char}s`;

type CountAndSay<
	T extends string,
	str extends string[] = [],
	count extends 1[] = [],
> = T extends `${infer first}${infer next}${infer rest}`
	? first extends next
		? CountAndSay<`${next}${rest}`, str, [...count, 1]>
		: CountAndSay<`${next}${rest}`, [...str, say<first, count>]>
	: T extends `${infer first}${string}`
	  ? CountAndSay<'', [...str, say<first, count>]>
	  : joinWords<str>;

export const countAndSay = <const T extends number>(
	input: T,
): CountAndSay<`${T}`> => {
	const string = input.toString();
	const response: string[] = [];
	let count = 0;
	for (let i = 0; i < string.length; i++) {
		const curr = string[i] as string;
		const next = string[i + 1] as string;
		count++;
		if (curr !== next) {
			response.push(`${words[count]} ${curr}s`);
			count = 0;
		}
	}
	return response.join(', then ') as never;
};
