export const justifyText = (words: string[], maxWidth: number): string[] => {
	const lines: string[][] = [];
	let currLine: string[] | null = null;
	for (const word of words) {
		if (!currLine || [...currLine, word].join(" ").length >= maxWidth) {
			currLine = [word];
			lines.push(currLine);
			continue;
		}
		currLine.push(word);
	}

	const justified: string[] = [];
	for (const line of lines) {
		const spaces = Array<string>(
			Math.max(maxWidth - line.join(" ").length, 0),
		).fill(" ");
		const spacePerWord = Math.ceil(
			spaces.length / Math.max(line.length - 1, 1),
		);
		justified.push(
			line
				.map(
					(word, idx) =>
						word +
						spaces.splice(0, spacePerWord).join("") +
						(line[idx + 1] ? " " : ""),
				)
				.join(""),
		);
	}
	return justified;
};
