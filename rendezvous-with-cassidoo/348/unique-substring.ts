type stringToTuple<str extends string> =
	str extends `${infer first}${infer rest}`
		? [first, ...stringToTuple<rest>]
		: [];

type UniqueSubstring<
	str extends string,
	strTuple extends string[] = stringToTuple<str>,
	maxLength extends 1[] = [],
	currStart extends 1[] = [],
	currLength extends 1[] = [],
	uniqueChars extends string[] = [],
	idx extends 1[] = [],
	curr extends string = strTuple[idx["length"]],
> = idx["length"] extends strTuple["length"]
	? maxLength["length"]
	: curr extends uniqueChars[number]
		? UniqueSubstring<
				str,
				strTuple,
				[...currLength, 1][maxLength["length"]] extends number
					? [...currLength, 1]
					: maxLength,
				currStart,
				[...currLength, 1],
				uniqueChars,
				[...idx, 1]
			>
		: uniqueChars[1] extends undefined
			? UniqueSubstring<
					str,
					strTuple,
					[...currLength, 1][maxLength["length"]] extends number
						? [...currLength, 1]
						: maxLength,
					currStart,
					[...currLength, 1],
					[...uniqueChars, curr],
					[...idx, 1]
				>
			: UniqueSubstring<
					str,
					strTuple,
					maxLength,
					[...currStart, 1],
					[],
					[],
					currStart
				>;

export const uniqueSubstring = <Str extends string>(
	str: Str,
): UniqueSubstring<Str> => {
	let maxLength = 0;
	let currStart = 0;
	let currLength = 0;
	const uniqueChars = new Set<string>();
	for (let idx = 0; idx < str.length; idx++) {
		const curr = str[idx] as string;
		if (uniqueChars.has(curr)) {
			currLength++;
			maxLength = Math.max(maxLength, currLength);
		} else if (uniqueChars.size < 2) {
			uniqueChars.add(curr);
			currLength++;
			maxLength = Math.max(maxLength, currLength);
		} else {
			uniqueChars.clear();
			idx = currStart;
			currStart++;
			currLength = 0;
		}
	}
	return maxLength as never;
};
