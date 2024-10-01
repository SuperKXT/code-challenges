type StringSplit<Str extends string, SplitChar extends string> = string[];

export const stringSplit = <Str extends string, SplitChar extends string>(
	str: Str,
	splitChar: SplitChar,
): StringSplit<Str, SplitChar> => {
	const arr = [] as string[];
	let curr = '';
	for (const char of str) {
		if (!splitChar) {
			arr.push(char);
		} else if (char === splitChar) {
			arr.push(curr);
			curr = '';
		} else {
			curr += char;
		}
	}
	if (curr) arr.push(curr);
	return arr as never;
};
