export const scoreWordGame = (
	words: string[],
	scores: Record<string, number>,
): string => {
	const winner: { score: number; word: string } = { score: 0, word: '' };
	for (const word of words) {
		const score =
			word.length *
			Array.from(word)
				.map((char) => scores[char] ?? 0)
				.reduce((acc, curr) => acc + curr, 0);
		if (score > winner.score) {
			winner.score = score;
			winner.word = word;
		}
	}
	return winner.word;
};
