type IsAnagram<
	T extends string,
	U extends string,
> = T extends `${infer first}${infer tRest}`
	? U extends `${infer uPrefix}${first}${infer uSuffix}`
		? IsAnagram<tRest, `${uPrefix}${uSuffix}`>
		: false
	: U extends ""
		? true
		: false;

type UpdateAnagramMap<
	Map extends [string, string[]][],
	Word extends string,
	_found extends boolean = false,
> = Map extends [
	infer curr extends [string, string[]],
	...infer rest extends [string, string[]][],
]
	? IsAnagram<Word, curr[0]> extends true
		? [[curr[0], [...curr[1], Word]], ...UpdateAnagramMap<rest, Word, true>]
		: [curr, ...UpdateAnagramMap<rest, Word, _found>]
	: _found extends false
		? [[Word, [Word]]]
		: [];

type AnagramResult<Map extends [string, string[]][]> = Map extends [
	infer curr extends [string, string[]],
	...infer rest extends [string, string[]][],
]
	? [curr[1], ...AnagramResult<rest>]
	: [];

type GroupAnagrams<
	Words extends string[],
	_map extends [string, string[]][] = [],
> = Words extends [infer word extends string, ...infer rest extends string[]]
	? GroupAnagrams<rest, UpdateAnagramMap<_map, word>>
	: AnagramResult<_map>;

export const groupAnagrams = <const Words extends [string, ...string[]]>(
	words: Words,
): GroupAnagrams<Words> => {
	const anagrams = new Map<string, string[]>();
	for (const word of words) {
		const key = word.split("").sort().join("");
		const existing = anagrams.get(key) ?? [];
		anagrams.set(key, [...existing, word]);
	}
	return Array.from(anagrams.values()) as never;
};
