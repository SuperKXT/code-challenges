export const uniqueSubstring = <Str extends string>(str: Str): number => {
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
			uniqueChars.add(curr);
			idx = currStart;
			currStart++;
			currLength = 0;
		}
	}
	return maxLength;
};
