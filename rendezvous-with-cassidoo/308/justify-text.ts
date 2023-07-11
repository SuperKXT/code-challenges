export const justifyText = (words: string[], maxWidth: number): string[] => {
	const lines: string[][] = [];
	const currLine: string[] = [];
	for (const word of words) {
		if ([...currLine, word].join(' ').length >= maxWidth && currLine.length) {
			lines.push(currLine.splice(0, currLine.length));
			currLine.push(word);
			continue;
		}
		currLine.push(word);
	}
	if (currLine.length) lines.push(currLine);

	const justified: string[] = [];
	for (const line of lines) {
		const spaces = Array<string>(
			Math.max(maxWidth - line.join(' ').length, 0)
		).fill(' ');
		const spacePerWord = Math.ceil(
			spaces.length / Math.max(line.length - 1, 1)
		);
		justified.push(
			line
				.map(
					(word, idx) =>
						word +
						spaces.splice(0, spacePerWord).join('') +
						(line[idx + 1] ? ' ' : '')
				)
				.join('')
		);
	}
	return justified;
};
