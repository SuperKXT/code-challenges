type dictExists<Str extends string, Dict extends string[]> = Dict extends [
	infer match extends string,
	...infer restArr extends string[],
]
	? Str extends `${match}${infer restStr}`
		? restStr
		: dictExists<Str, restArr>
	: false;

type WordBreak<Str extends string, Dict extends string[]> = Str extends ''
	? true
	: dictExists<Str, Dict> extends infer rest extends string
		? WordBreak<rest, Dict>
		: false;

export const wordBreak = <
	const Str extends string,
	const Dict extends [string, ...string[]],
>(
	string: Str,
	dict: Dict,
): WordBreak<Str, Dict> => {
	let curr = string;
	const regex = new RegExp(`^(${dict.join('|')})`, 'ui');
	while (curr !== '') {
		const matched = curr.match(regex);
		if (!matched) return false as never;
		curr = curr.replace(matched[0], '') as Str;
	}
	return true as never;
};
